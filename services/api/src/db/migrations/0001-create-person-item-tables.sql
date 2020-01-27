CREATE TABLE IF NOT EXISTS person (
    id UUID DEFAULT uuid_generate_v1() NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS item (
    item_id VARCHAR NOT NULL,
    access_token VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS person_item (
    person_id UUID NOT NULL,
    item_id VARCHAR NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person (id),
    FOREIGN KEY (item_id) REFERENCES item (item_id),
    PRIMARY KEY (person_id, item_id)
);