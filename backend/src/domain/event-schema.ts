import { Type, Static } from "@sinclair/typebox";

export const eventSchema = Type.Object({
  name: Type.String(),
  date: Type.String(), // TODO: ⚠️ Fix very wrong parsing
  availableSeats: Type.Integer({ minimum: 1 }),
});

export type EventDTO = Static<typeof eventSchema>;
