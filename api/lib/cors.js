// api/lib/cors.js
// CORS and security headers helper

export function setCorsHeaders(res, origin) {
  const allowedOrigins = [
    "https://govnics-murex.vercel.app",
    "http://localhost:8081",
    "http://localhost:3000",
  ];

  const requestOrigin = origin || "";
  const isAllowed = allowedOrigins.some((o) => requestOrigin.startsWith(o));

  res.setHeader("Access-Control-Allow-Origin", isAllowed ? requestOrigin : allowedOrigins[0]);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}

export function handleOptions(req, res) {
  if (req.method === "OPTIONS") {
    setCorsHeaders(res, req.headers.origin);
    res.status(204).end();
    return true;
  }
  return false;
}

export function jsonResponse(res, status, data) {
  res.status(status).json(data);
}

export function errorResponse(res, status, message, details = {}) {
  res.status(status).json({ success: false, error: message, ...details });
}

export function successResponse(res, data = {}) {
  res.status(200).json({ success: true, ...data });
}
