import { Prisma } from "@prisma/client/";
import { getConnection } from "./db";

export async function addTicket(newTicket: Prisma.TicketCreateInput) {
  const result = await getConnection().ticket.create({
    data: { ...newTicket },
  });
  return result;
}
export async function get_event(ticketId: number) {
  const ticket = await getConnection().ticket.findUnique({
    where: { ticketId: ticketId },
  });
  return await getConnection().event.findUnique({
    where: { eventId: ticket?.eventId },
  });
}
export async function get_event_id(ticketId: number) {
  const event = await get_event(ticketId);
  return event?.eventId;
}

export async function delete_ticket(ticketId: number) {
  return await getConnection().ticket.delete({ where: { ticketId: ticketId } });
}
