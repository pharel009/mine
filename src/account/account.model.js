import { executeQuery } from "../config/database.js";

//account table
export const accountTable = async () => {
    const query = `
    CREATE TABLE  IF NOT EXISTS accounts (
        id SERIAL PRIMARY KEY,
        users_id SERIAL,
        FOREIGN KEY (users_id) REFERENCES users(id),
        AcctNumber VARCHAR(10) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

        try {
            await executeQuery(query);
            console.log("Account table created");
        } catch (error) {
            console.error("Error creating acount table", error);
    }
    
};