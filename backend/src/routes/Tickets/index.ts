import { FastifyPluginAsync } from "fastify";
import { commonHTTPResponses } from "../../common";
import { TicketDTO, ticketSchema } from "../../domain/ticket-schema";
import {
  add_ticket,
  cancel_ticket,
  assert_valid_ticket,
} from "../../domain/ticket-use-case";
import { Type } from "@sinclair/typebox";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.delete(
    "/:id",
    {
      schema: {
        response: {
          204: ticketSchema,
          ...commonHTTPResponses,
        },
        params: Type.Object({
          id: Type.Number(),
        }),
      },
    },
    async function (request, reply) {
      type DeleteRequest = { id: number };

      const ticketRequest = request.params as DeleteRequest;
      try {
        await assert_valid_ticket(ticketRequest.id);
      } catch (err) {
        console.log(err);
        return reply.conflict();
      }
      try {
        await cancel_ticket(ticketRequest.id);
      } catch (err) {
        return reply.notFound();
      }
      return reply.code(204);
    },
  );
  fastify.post(
    "",
    {
      schema: {
        tags: ["Ticket"],
        body: ticketSchema,
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
        response = await add_ticket(request.body as TicketDTO);
      } catch (err) {
        if (typeof err) {
          console.log(err);
          return repy.conflict("There is no seats left.");
        }
      }
      return repy.code(201).send(response);
    },
  );
};

export default example;
