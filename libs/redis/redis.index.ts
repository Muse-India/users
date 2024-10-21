import { userRepository } from "./redis.repository";

export const connectToRedis = async () => {
  await userRepository.createIndex();
};
