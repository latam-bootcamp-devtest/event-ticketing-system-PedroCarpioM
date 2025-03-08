import { Prisma } from "@prisma/client/";
import { getConnection } from "./db";

export async function addEvent(newEvent: Prisma.EventCreateInput) {
  const result = await getConnection().event.create({
    data: { ...newEvent },
  });
  return result;
}

export async function getAll(page: number, pagesize: number) {
  const skip = (page - 1) * pagesize;
  const result = await getConnection().event.findMany({
    skip: skip,
    take: pagesize,
  });
  return result;
}

export async function getSize() {
  return await getConnection().event.count();
}

export async function book(eventId: number) {
  const event = await get_event(eventId);
  if (event?.availableSeats! < 1) {
    throw new Error("The event has no seats available left.");
  }
  await getConnection().event.update({
    where: {
      eventId: eventId,
    },
    data: {
      availableSeats: event?.availableSeats! - 1,
    },
  });
}

async function get_event(eventId: number) {
  return getConnection().event.findUnique({ where: { eventId: eventId } });
}

export async function increase_one_seat(event_id: number) {
  const event = await getConnection().event.findUnique({
    where: { eventId: event_id },
  });
  await getConnection().event.update({
    where: {
      eventId: event_id,
    },
    data: {
      availableSeats: event?.availableSeats! + 1,
    },
  });
}
