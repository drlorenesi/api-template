# api-template

Base template for an API using Express.

Create a ".env" file at the root folder with the following info:

```text
## JSON Web Token key
jwtPrivateKey=myPrivateKey

## DB Info
PGHOST=ec2-3-211-176-230.compute-1.amazonaws.com
PGDATABASE=da55kpajbtimqm
PGUSER=rynvgimsgytatx
PGPORT=5432
PGPASSWORD=667c646396fcf9babe0e2de58361d768b3357577ba690312b096a296977064cd
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
