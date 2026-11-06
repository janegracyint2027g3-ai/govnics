import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function apiServerlessPlugin(): Plugin {
  return {
    name: "vite-api-serverless-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/")) {
          return next();
        }

        try {
          const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

          // All /api/* requests are routed through the central api/index.js gateway
          // (mirrors Vercel production routing — single function handles all routes)
          const gatewayPath = path.resolve(process.cwd(), "api", "index.js");

          // Buffer request body
          let body = "";
          for await (const chunk of req) {
            body += chunk;
          }
          if (body) {
            try {
              (req as any).body = JSON.parse(body);
            } catch {
              (req as any).body = body;
            }
          } else {
            (req as any).body = {};
          }

          // Ensure req.url includes the full path so the gateway router can match it
          (req as any).url = req.url;

          // Parse search query
          (req as any).query = Object.fromEntries(parsedUrl.searchParams.entries());

          // Attach response helpers (Express-style, used by handlers)
          (res as any).status = function (code: number) {
            res.statusCode = code;
            return res;
          };
          (res as any).json = function (data: any) {
            if (!res.headersSent) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            }
            return res;
          };
          (res as any).send = function (data: any) {
            if (!res.headersSent) {
              if (typeof data === "object") {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
              } else {
                res.end(String(data));
              }
            }
            return res;
          };

          // Execute the central API gateway handler
          const module = await server.ssrLoadModule(gatewayPath);
          if (typeof module.default === "function") {
            await module.default(req, res);
          } else {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "API gateway handler missing" }));
          }
        } catch (err: any) {
          console.error("[API Error]", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: err?.message || "Internal server error" }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load environment variables from .env.local and .env
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    server: {
      host: "::",
      port: 8081,
    },
    plugins: [react(), apiServerlessPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
    },
  };
});
