const postgres = require('postgres');
const db = postgres({
    host: process.env.AUTH_DB_HOST,
    username: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASSWORD
});

const argv = require('process').argv;
(async () => {
if (argv[2] == 'up') {
    await db`CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY NOT NULL,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(32) NOT NULL
    )`
    await db`CREATE TABLE IF NOT EXISTS logged_users (
        token CHAR(32) PRIMARY KEY NOT NULL,
        user_id integer REFERENCES users NOT NULL
    )`
    console.log("Migrated");
} else if (argv[2] == 'down') {
    await db`DROP TABLE IF EXISTS logged_users`
    await db`DROP TABLE IF EXISTS users`
    console.log("Migrated");
} else {
    throw new Error("Invalid argument, expected 'up' or 'down'")
}
process.exit(0)
})()