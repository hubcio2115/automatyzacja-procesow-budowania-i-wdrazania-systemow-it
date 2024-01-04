CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"surname" varchar(256) NOT NULL,
	"age" smallint NOT NULL,
	"email" varchar(256) NOT NULL
);
