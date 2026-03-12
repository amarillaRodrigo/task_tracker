import Fastify, { type FastifyServerOptions } from "fastify";
import corsPlugin from "./plugins/cors.js";
import healthRoutes from "./modules/health/health.routes.js";
import tasksRoutes from "./modules/tasks/tasks.routes.js";

export function buildServer(opts: FastifyServerOptions = {}) {
  const fastify = Fastify(opts);

  //Plugins
  fastify.register(corsPlugin);
  //fastify.register(swaggerPlugin);
  //fastify.register(prismaPlugin);

  //Rutas
  fastify.register(healthRoutes, { prefix: "/api" });
  fastify.register(tasksRoutes, { prefix: "/api" });

  return fastify;
}
