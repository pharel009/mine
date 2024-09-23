import { executeQuery } from "../../config/database.js";

//transfer table
export const transferTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS transfers (
        Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        fromAccountId UUID NOT NULL,
        toAccountId UUID NOT NULL,
        amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
        transferDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (fromAccountId) REFERENCES accounts(Id),
        FOREIGN KEY (toAccountId) REFERENCES accounts(Id)
    )`;

    try {
        await executeQuery(query);
        console.log("Transfers table created");
    } catch (error) {
        console.log("Error creating transfers table", error);
    }
};