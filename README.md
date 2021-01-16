# api-template

Base template for an API using Express and a PostgeSQL database.

Create a ".env" file at the root folder with the following info:

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

or, if you have nodemon globally installed, run the dev environment:

```bash
npm run dev
```
