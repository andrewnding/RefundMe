import { migrate, CreateDBConfig, MigrateDBConfig } from "postgres-migrations"

const {
    PG_HOST,
    PG_USER,
    PG_PASSWORD,
    PG_DATABASE,
    PG_PORT,
} = process.env;

const dbConfig: CreateDBConfig & MigrateDBConfig = {
    defaultDatabase: PG_DATABASE,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: parseInt(PG_PORT),
}

console.log('Running migrations...')

migrate(dbConfig, `${__dirname}/../src/db/migrations`)
.then(() => {
    console.log('Done running migrations')
})
.catch((err) => {
   console.log('Error running migrations:')
   console.log(err);
   process.exit(1)
})