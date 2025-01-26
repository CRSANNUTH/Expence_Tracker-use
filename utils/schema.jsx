import { serial, pgTable, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id: serial("id").primaryKey(), // Use serial for auto-incrementing IDs
    name: varchar('name', { length: 255 }).notNull(), // Corrected noNull to notNull
    amount: varchar('amount', { length: 255 }).notNull(), // Corrected noNull to notNull
    icon: varchar('icon', { length: 255 }), // Optional field, no need for notNull
    createdBy: varchar('createdBy', { length: 255 }).notNull() // Corrected noNull to notNull
});
