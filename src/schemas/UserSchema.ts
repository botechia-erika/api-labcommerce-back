import {z} from 'zod'
export const UserSchema = z.object({
 id: z.string(),
 name: z.string(),
nickname: z.string(),
password: z.string(),
email: z.string(),
createdAt: z.string(),
avatar: z.string(),
role: z.string()
})

