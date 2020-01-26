"use strict";
exports.__esModule = true;
var postgres_migrations_1 = require("postgres-migrations");
var _a = process.env, PG_HOST = _a.PG_HOST, PG_USER = _a.PG_USER, PG_PASSWORD = _a.PG_PASSWORD, PG_DATABASE = _a.PG_DATABASE, PG_PORT = _a.PG_PORT;
var dbConfig = {
    defaultDatabase: PG_DATABASE,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: parseInt(PG_PORT)
};
console.log(process.env);
postgres_migrations_1.migrate(dbConfig, '../src/db/migrations')
    .then(function () {
    console.log('Done running migrations');
})["catch"](function (err) {
    console.log('Error running migrations:');
    console.log(err);
    process.exit(1);
});
