import { Schema } from "redis-om";

export const userSchema: Schema = new Schema("redis", {
  // Define the schema here
  email: { type: "string" },
  phoneNumber: { type: "string" },
  name: { type: "string" },
  password: { type: "string" },
  role: { type: "string" },
  country: { type: "string" },
});
