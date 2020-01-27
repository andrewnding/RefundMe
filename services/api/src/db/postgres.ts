import { Pool } from 'pg';
import { PersonType, ItemType } from '../types/database-types';

const {
    PG_CONNECTION_STRING,
} = process.env;

const pool = new Pool({
    connectionString: PG_CONNECTION_STRING,
})

export const getPerson: (person_id: string) => Promise<PersonType> = async (person_id: string) => {
    try {
        const res = await pool.query(`SELECT * FROM person where id = $1`, [person_id]);
        return res.rows[0]
    } catch (err) {
        console.log(err)
    }
}

export const getItemsFromPerson: (person_id: string) => Promise<ItemType[]> = async (person_id: string) => {
    try {
        const personItemRes = await pool.query('SELECT item_id FROM person_item where person_id = $1', [person_id]);
        
        if (personItemRes.rows.length == 0) {
            console.log(`Error: No items for person ${person_id}`)
            return
        }

        const item_ids = personItemRes.rows.map(row => row.item_id);
        const itemRes = await pool.query('SELECT * from item where item_id = ANY($1::varchar[])', [item_ids]);
        return itemRes.rows
    } catch (err) {
        console.log(err)
    }
}

export const createItem: (person_id: string, item_id: string, access_token: string) => Promise<void>
    = async (person_id: string, item_id: string, access_token: string) => {
        // You must use transactions with a client, not with a pool
        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            await client.query('INSERT into item (item_id, access_token) VALUES ($1, $2)', [item_id, access_token]);
            await client.query('INSERT into person_item (person_id, item_id) VALUES ($1, $2)', [person_id, item_id]);
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            console.log(`Error creating item for person_id ${person_id} and item_id ${item_id}: ${err}`);
            throw err
        } finally {
            client.release()
        }
}