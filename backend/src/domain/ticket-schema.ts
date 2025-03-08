import { Type, Static } from "@sinclair/typebox";

export const ticketSchema = Type.Object({
  userId: Type.Integer(),
  eventId: Type.Integer(),
});
export type TicketDTO = Static<typeof ticketSchema>;
