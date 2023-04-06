import { Knex } from "knex";
import { listData } from "./data/list-data";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("lists").del();

    // Inserts seed entries
    await knex("lists").insert(listData);
};
