import { Prisma } from "@prisma/client/";
import { getConnection } from "./db";

export async function addEvent(newEvent: Prisma.EventCreateInput) {
  const result = await getConnection().event.create({
    data: { ...newEvent },
  });
  return result;
}
