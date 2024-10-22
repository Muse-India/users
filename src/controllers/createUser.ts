import { Context } from "hono";
import { userType } from "../../libs/types/userType";
import { getUser } from "../../libs/utils/getUser";
import { hashPassword } from "../../libs/utils/hashPassword";
import { addUser } from "../../libs/utils/addUser";

export const createUser = async (c: Context) => {
  const { country, email, name, password, phoneNumber, role }: userType =
    await c.req.json();

  // check if the user already exists
  const user = await getUser(email);

  if (user) {
    return c.json({
      error: "User already exists",
      status: 400,
    });
  }

  // hash the password
  const hashedPassword = await hashPassword({ password });

  const userDataToEnter = {
    email,
    name,
    password: hashedPassword,
    phoneNumber,
    role,
    country,
  };

  const newUser = await addUser(userDataToEnter);

  // return the user
  return c.json({ message: "User created successfully", user: newUser }, 200);
};
