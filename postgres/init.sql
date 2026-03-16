CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO todos (title, done) VALUES
    ('Learn Docker', false),
    ('WRITE a dockerfile', false),
    ('Master docker-compose', false);