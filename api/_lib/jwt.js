// api/_lib/jwt.js
// GOVENICS GRC — Enterprise JWT Token Service (RFC 7519 compliant)
// Native Node.js crypto implementation with zero external dependencies.
// Enforces 30-minute expiration for enterprise security compliance.

import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

// ─── Configuration ───────────────────────────────────────────────────────────
export const JWT_EXPIRY_SECONDS = 30 * 60; // 30 Minutes (1800 seconds)

export const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.SESSION_SECRET ||
  "govenics_grc_enterprise_jwt_secure_secret_key_2026_production_v1";

// ─── Base64URL Encoding & Decoding Helpers ──────────────────────────────────
function base64UrlEncode(input) {
  const buff = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buff.toString("base64url");
}

function base64UrlDecode(str) {
  return Buffer.from(str, "base64url").toString("utf8");
}

// ─── Sign JWT ─────────────────────────────────────────────────────────────────
/**
 * Signs a payload into an RFC 7519 compliant JSON Web Token (HS256).
 * @param {object} payload - Claims to embed in the token.
 * @param {object} [options] - Optional overrides (e.g. expiresIn, secret).
 * @returns {string} The serialized JWT token string.
 */
export function signJwt(payload, options = {}) {
  const expiresIn = options.expiresIn ?? JWT_EXPIRY_SECONDS;
  const secret = options.secret || JWT_SECRET;
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const fullPayload = {
    iss: "govenics-grc",
    aud: "govenics-portal",
    jti: uuidv4(),
    iat: now,
    nbf: now,
    exp: now + expiresIn,
    ...payload,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(dataToSign)
    .digest("base64url");

  return `${dataToSign}.${signature}`;
}

// ─── Verify JWT ───────────────────────────────────────────────────────────────
/**
 * Cryptographically verifies an HS256 JWT and checks expiration.
 * @param {string} token - The raw JWT token string.
 * @param {object} [options] - Optional overrides (e.g. secret).
 * @returns {{ valid: boolean, payload?: object, error?: string, expired?: boolean }}
 */
export function verifyJwt(token, options = {}) {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Token is missing or invalid type." };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return { valid: false, error: "Malformed JWT structure. Expected 3 segments." };
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const secret = options.secret || JWT_SECRET;

  try {
    // 1. Verify Signature using constant-time comparison
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return { valid: false, error: "Invalid cryptographic signature." };
    }

    // 2. Decode Header & Payload
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    if (header.alg !== "HS256") {
      return { valid: false, error: `Unsupported algorithm: ${header.alg}. Expected HS256.` };
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);

    // 3. Verify Expiry (Strict 30-min enforcement)
    if (typeof payload.exp === "number" && now > payload.exp) {
      const expiredAgoSeconds = now - payload.exp;
      return {
        valid: false,
        expired: true,
        error: `Token expired ${expiredAgoSeconds}s ago (Limit: 30 minutes). Please log in again.`,
        payload,
      };
    }

    // 4. Verify Not Before (nbf)
    if (typeof payload.nbf === "number" && now < payload.nbf - 10) {
      return { valid: false, error: "Token is not yet active." };
    }

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: `JWT decoding failed: ${err.message}` };
  }
}

// ─── Decode JWT without verification (Metadata inspection) ───────────────────
export function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.trim().split(".");
  if (parts.length < 2) return null;
  try {
    return JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    return null;
  }
}

// ─── Extract Token from Request ──────────────────────────────────────────────
/**
 * Extracts JWT token from Authorization header (Bearer) or request cookies.
 * @param {object} req - HTTP request object.
 * @returns {string|null}
 */
export function extractTokenFromRequest(req) {
  if (!req) return null;

  // 1. Authorization: Bearer <token>
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (authHeader && typeof authHeader === "string") {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // 2. Check cookies (govenics_jwt, govenics_token, or govenics_session)
  const cookieHeader = req.headers?.cookie || "";
  const jwtMatch = cookieHeader.match(/govenics_jwt=([^;]+)/);
  if (jwtMatch && jwtMatch[1]) {
    return jwtMatch[1].trim();
  }

  const tokenMatch = cookieHeader.match(/govenics_token=([^;]+)/);
  if (tokenMatch && tokenMatch[1]) {
    return tokenMatch[1].trim();
  }

  // If govenics_session looks like a JWT (3 dot-separated parts)
  const sessionMatch = cookieHeader.match(/govenics_session=([^;]+)/);
  if (sessionMatch && sessionMatch[1] && sessionMatch[1].split(".").length === 3) {
    return sessionMatch[1].trim();
  }

  return null;
}
