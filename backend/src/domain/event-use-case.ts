import * as eventRepository from "../data-access/event_repository";
import { EventDTO } from "./event-schema";
import { assertIsValid } from "./event-validator";

export async function add_event(event: any): Promise<EventDTO> {
  await assertIsValid(event);
  const response = await eventRepository.addEvent(event);
  return response;
}

export async function get_all_events(page: number, pagesize: number) {
  const response = await eventRepository.getAll(page, pagesize);
  const format = {
    currentPage: page,
    pageSize: pagesize,
    totalPages: Math.floor((await get_size_events()) / pagesize),
    events: response,
  };
  return format;
}

export async function get_size_events() {
  return await eventRepository.getSize();
}
