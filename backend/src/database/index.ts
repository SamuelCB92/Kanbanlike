import { Pool } from "pg"; // Import PostgreSQL pool from 'pg' package; pool is a node-postgres feature which has methods to manage multiple client connections. Its an object with properties and methods to interact with the database.
import dotenv from "dotenv"; // For environment variables

dotenv.config(); // Load environment variables

const pool = new Pool({
  user: process.env.DB_USER, // Database username
  host: process.env.DB_HOST, // Database host (e.g., localhost)
  database: process.env.DB_NAME, // Name of your database
  password: process.env.DB_PASSWORD, // Database password
  port: Number(process.env.DB_PORT), // Database port (typically 5432 for PostgreSQL)
});

// .on method listens for events on the pool object, "connect" event is emitted when a new client is connected to the database
pool.on("connect", () => {
  console.log("✅ Connected to postgres");
});
// "error" event is emitted when there is an error on the idle client. console.error logs the error message to the console.
pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
});

export default pool; // Export pool for use in other files
