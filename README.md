# API Template

This project is base template for an API using [Express](https://expressjs.com/) and a [PostgeSQL](https://www.postgresql.org/) database.

If you are hosting your database in [Heroku](https://heroku.com/) you can connect through your terminal with the following command (using your credentials):

```bash
psql -h xxx-xx-xxx-xxx-xxx.compute-1.amazonaws.com -d xx9n7dxxhxx -U yhxxzyxxxezhxx
```

To create the database, copy `dbexport.pgsql` from the `setup` folder to your home folder and run the following command from your terminal:

```bash
psql -h xxx-xx-xxx-xxx-xxx.compute-1.amazonaws.com -d xx9n7dxxhxx -U yhxxzyxxxezhxx  < dbexport.pgsql
```

You can back up your database at any time by running the following command:

```bash
pg_dump -h xxx-xx-xxx-xxx-xxx.compute-1.amazonaws.com -d xx9n7dxxhxx -U yhxxzyxxxezhxx  > dbexport.pgsql
```

Create an `.env` file at the root folder with the following info:

```text
## JSON Web Token key
jwtPrivateKey=myPrivateKey

## DB Info
PGHOST=host
PGDATABASE=database
PGUSER=user
PGPORT=5432
PGPASSWORD=password
```

Make sure to change these values according to your environment (development, testing or production).

To start the server run:

```bash
npm start
```

or, run the dev environment:

```bash
npm run dev
```

and finally, to run tests:

```bash
npm run test
```
