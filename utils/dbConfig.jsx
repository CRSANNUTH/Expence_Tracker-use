import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Create a Neon client instance
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

// Configure Drizzle ORM with schema and Neon client
export const db = drizzle(sql, { schema });


