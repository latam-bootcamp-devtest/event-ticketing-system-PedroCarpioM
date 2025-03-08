import * as eventRepository from "../data-access/event_repository";
import { EventDTO } from "./event-schema";
import { assertIsValid } from "./event-validator";

export async function add_event(event: any): Promise<EventDTO> {
  await assertIsValid(event);
  const response = await eventRepository.addEvent(event);
  return response;
}
