CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author VARCHAR(50) NOT NULL,
    cover_edition_key TYPE VARCHAR(11),
    date_read DATE,
    note TEXT,
    rating DECIMAL(2, 1),
    UNIQUE (title, author)
);