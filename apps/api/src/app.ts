import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./config/env.js";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: true,
  });

  app.get("/health", async () => {
    return {
      status: "ok",
      environment: env.NODE_ENV,
    };
  });

  return app;
}