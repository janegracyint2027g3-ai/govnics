import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

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
          const pathname = parsedUrl.pathname;

          // Map /api/xyz to ./api/xyz.js
          const relativePath = pathname.replace(/^\/api\//, "");
          let filePath = path.resolve(process.cwd(), "api", `${relativePath}.js`);

          if (!fs.existsSync(filePath)) {
            filePath = path.resolve(process.cwd(), "api", relativePath, "index.js");
            if (!fs.existsSync(filePath)) {
              res.statusCode = 404;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({ success: false, error: `API route not found: ${pathname}` }));
            }
          }

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

          // Parse search query
          (req as any).query = Object.fromEntries(parsedUrl.searchParams.entries());

          // Attach response helpers
          (res as any).status = function (code: number) {
            res.statusCode = code;
            return res;
          };
          (res as any).json = function (data: any) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return res;
          };

          // Execute handler via Vite SSR loader
          const module = await server.ssrLoadModule(filePath);
          if (typeof module.default === "function") {
            await module.default(req, res);
          } else {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: "Handler function missing in route" }));
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
