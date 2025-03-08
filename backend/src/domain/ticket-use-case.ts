import * as ticketRepository from "../data-access/ticket_repository";
import { book, increase_one_seat } from "../data-access/event_repository";
import { TicketDTO } from "./ticket-schema";

export async function add_ticket(ticket: any): Promise<TicketDTO> {
  await book(ticket.eventId);
  const response = await ticketRepository.addTicket(ticket);
  return response;
}

export async function cancel_ticket(ticket_id: number) {
  const ticket_event_id = await ticketRepository.get_event_id(ticket_id);
  const response = await ticketRepository.delete_ticket(ticket_id);
  await increase_one_seat(ticket_event_id!);
  return response;
}

export async function assert_valid_ticket(ticket_id: number) {
  const event = await ticketRepository.get_event(ticket_id);
  const valid = parseInt(event!.date) > Date.now();
  if (!valid) throw new Error("The event has alredy ocured.");
}
