import { Pool } from 'pg';

const {
    PG_CONNECTION_STRING,
} = process.env;

const pool = new Pool({
    connectionString: PG_CONNECTION_STRING,
})

export const getNow = () => {
    pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
    })
}