import { FastifyPluginAsync } from "fastify";
import { add_event, get_all_events } from "../../domain/event-use-case";
import { EventDTO, eventSchema } from "../../domain/event-schema";
import { commonHTTPResponses } from "../../common";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "",
    {
      schema: {
        tags: ["Event"],
        response: {
          200: {
            description: "Succesful acceptance",
          },
          ...commonHTTPResponses,
        },
      },
    },
    async function (request, repy) {
      const params = request.query;
      const pagesize = parseInt(params.pagesize);
      const page = parseInt(params.page);
      return await get_all_events(page, pagesize);
    },
  );
  fastify.post(
    "",
    {
      schema: {
        tags: ["Event"],
        body: eventSchema,
        response: {
          201: {
            description: "Succesful acceptance",
          },
          ...commonHTTPResponses,
        },
      },
    },
    async function (request, repy) {
      let response;
      try {
        response = await add_event(request.body as EventDTO);
      } catch (err) {
        if (err) {
          console.log(err);
          return repy.badRequest();
        }
      }
      return repy.code(201).send(response);
    },
  );
};

export default example;
