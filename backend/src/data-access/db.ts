import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

let connection: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

export function getConnection() {
  if (!connection) {
    connection = new PrismaClient();
  }
  return connection;
}
