import { Knex } from "knex";
import userData from "./data/user-data.json";

const table_name = "users";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert(userData);
};
