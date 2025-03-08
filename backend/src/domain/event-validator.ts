import { EventDTO } from "./event-schema";

export async function assertIsValid(event: EventDTO) {
  // TODO: ⚠️ Fix very wrong parsing
  if (parseInt(event.date) < Date.now()) {
    throw new Error("The event alredy ocurred.");
  }
}
