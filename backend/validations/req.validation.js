import {z} from 'zod';

export const signupPostRequestBodySchema = z.object({
    firstname: z.string(),
    lastname:z.string().optional(),
    email:z.string().email(),
    password:z.string().min(3),    
})

export const loginPostRequestbodySchema = z.object({
    email:z.string().email(),
    password:z.string().min(3),  
})

export const shortenPostRequestSchema = z.object({
    url:z.string().url(),
    code:z.string().optional()
})