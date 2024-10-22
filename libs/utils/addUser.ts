import { produceUsers } from "../kafka/kafka.producer";
import { userRepository } from "../redis/redis.repository";
import { userType } from "../types/userType";

export const addUser = async (data: userType) => {
  try {
    // save user to redis-cache
    const user = await userRepository.save(`user:${data.email}`, data);

    // queuing user in kafka
    await produceUsers(data);

    return user;
  } catch (error: any) {
    console.log(error.messages);
    throw new Error("Error in adding user");
  }
};
