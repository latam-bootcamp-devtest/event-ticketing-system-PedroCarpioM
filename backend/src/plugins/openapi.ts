import fastifySwagger, { FastifySwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fp from "fastify-plugin";

/**
 * This plugins adds a swagger plugin
 *
 * @see https://swagger.io
 */
export default fp<FastifySwaggerOptions>(async (fastify) => {
  fastify.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Pedro Dev Test Api",
        description: "Dev Test Api to manage event tickets",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server runing in local",
        },
      ],
      tags: [
        { name: "User", description: "User related end-points" },
        { name: "Booking", description: "Booking related end-points" },
        { name: "Event", description: "Event related end-points" },
      ],
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
    },
  });
  fastify.register(fastifySwaggerUi);
});
