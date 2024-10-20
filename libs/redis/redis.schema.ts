import { Schema } from "redis-om";

export const redisSchema: Schema = new Schema("redis", {
  // Define the schema here
  key: { type: "string" },
});
