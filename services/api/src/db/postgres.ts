import { Pool } from 'pg';
import { PersonType, PersonTypeDb, ItemType, DataStoreType } from 'types';

const {
    PG_CONNECTION_STRING,
} = process.env;

class PostgresStore implements DataStoreType {
    pool: Pool

    constructor() {
        this.pool = new Pool({
            connectionString: PG_CONNECTION_STRING,
        })
    }

    getPersonById: (person_id: string) => Promise<PersonType> = async (person_id: string) => {
        try {
            const res = await this.pool.query('SELECT * FROM person where id = $1', [person_id]);
            if (res.rows.length == 0) {
                return null
            }

            const result: PersonTypeDb = res.rows[0]
            const person: PersonType = {
              id: result.id,
              email: result.email,
              password: result.password,
              firstName: result.first_name,
              lastName: result.last_name,
              createdAt: result.created_at,
            }
            
            return person
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    getPersonByEmail: (email: string) => Promise<PersonType> = async (email: string) => {
        try {
            const res = await this.pool.query('SELECT * FROM person where email = $1', [email]);
            if (res.rows.length == 0) {
                return null
            }

            const result: PersonTypeDb = res.rows[0]
            const person: PersonType = {
              id: result.id,
              email: result.email,
              password: result.password,
              firstName: result.first_name,
              lastName: result.last_name,
              createdAt: result.created_at,
            }
            
            return person
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    
    createPerson: (person: PersonType) => Promise<PersonType> = async (person: PersonType) => {
        const {
            id,
            email,
            password,
            firstName,
            lastName,
        } = person;
    
        try {
            const res = await this.pool.query('INSERT INTO person (id, email, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5)', [id, email, password, firstName, lastName])
            return res.rows[0]
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    
    getItemsFromPerson: (person_id: string) => Promise<ItemType[]> = async (person_id: string) => {
        try {
            const personItemRes = await this.pool.query('SELECT item_id FROM person_item where person_id = $1', [person_id]);
            
            if (personItemRes.rows.length == 0) {
                console.log(`Error: No items for person ${person_id}`)
                return
            }
    
            const item_ids = personItemRes.rows.map(row => row.item_id);
            const itemRes = await this.pool.query('SELECT * from item where item_id = ANY($1::varchar[])', [item_ids]);
            return itemRes.rows
        } catch (err) {
            console.log(err)
        }
    }
    
    createAndAddItemToPerson: (person_id: string, item_id: string, access_token: string) => Promise<void>
        = async (person_id: string, item_id: string, access_token: string) => {
            // You must use transactions with a client, not with a pool
            const client = await this.pool.connect()
    
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
}

export default PostgresStore