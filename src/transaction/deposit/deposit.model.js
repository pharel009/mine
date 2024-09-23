import { executeQuery } from "../../config/database.js";

//deposit table
export const createDepositTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS deposits (
        Id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        accountId UUID,
        currency VARCHAR(3) NOT NULL CHECK(currency IN ('USD', 'NGN')),
        amount NUMERIC(10,2) DEFAULT 0.00 NOT NULL CHECK(amount >=0),
        depositDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (accountId) REFERENCES accounts(Id)

    )`;

    try {
        await executeQuery(query);
        console.log("Deposits table created");
    } catch (error) {
        console.log("Error creating deposits table", error);
    }
};