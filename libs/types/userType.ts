import { z } from 'zod'

export const userBody = z.object({
    email: z.string({message: "email is required"}).email("Invalid email"),
    phoneNumber: z.string({message: "phone Number is required"}).min(10).max(10),
    password: z.string().min(6).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    name: z.string({message: "name is required"}),
    role: z.enum(["ADMIN", "USER"], {message: "role must be either ADMIN or USER"}).default("USER").optional(),
    country: z.string({message: "country is required"}),
})

export type userType = z.infer<typeof userBody>