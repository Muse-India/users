import { Context } from "hono";
import { userType } from "../../libs/types/userType";
import { getUser } from "../../libs/utils/getUser";
import { hashPassword } from "../../libs/utils/hashPassword";

export const createUser = async (c: Context) => {
    const { country, email, name, password, phoneNumber, role }: userType = await c.req.json();
    let user;

    // check if the user already exists
    user = await getUser(email);

    if (user) {
        return c.json({
            error: "User already exists",
            status: 400,
        })
    }

    // hash the password
    const hashedPassword = await hashPassword({ password, salt: 10 });

    // TODO save user to cache and send to kafka for processing

    // return the user
    return user;
};