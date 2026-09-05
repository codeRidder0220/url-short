import {text, pgTable , varchar , timestamp ,uuid} from 'drizzle-orm/pg-core'

export const userTable  = pgTable("users",{
    id:uuid().primaryKey().defaultRandom(),
    
    firstname:varchar('first_name', {length:100}).notNull(),
    lastname:varchar('last_name',{length:100}),
    
    email:varchar({length:255}).notNull().unique(),
    
    password:text().notNull(),
    salt:text().notNull(),
    
    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp('updated_at').$onUpdate(()=>new Date()),

});