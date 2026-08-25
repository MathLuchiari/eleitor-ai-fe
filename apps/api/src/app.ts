import Fastify from "fastify";
import cors from "@fastify/cors";
import { env } from "./config/env.js";

import { candidatesRoutes } from './http/routes/candidates.js';
import { partiesRoutes } from './http/routes/parties.js';
import { governmentPlansRoutes } from './http/routes/government-plans.js';
import { documentsRoutes } from './http/routes/documents.js';
import { sourcesRoutes } from './http/routes/sources.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: true,
  });

  app.register(candidatesRoutes);
  app.register(partiesRoutes);
  app.register(governmentPlansRoutes);
  app.register(documentsRoutes);
  app.register(sourcesRoutes);

  app.get("/health", async () => {
    return {
      status: "ok",
      environment: env.NODE_ENV,
    };
  });

  return app;
}