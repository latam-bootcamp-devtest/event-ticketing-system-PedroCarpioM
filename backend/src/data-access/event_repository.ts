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
