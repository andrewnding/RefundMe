CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT uuid_generate_v1() NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (id)
)