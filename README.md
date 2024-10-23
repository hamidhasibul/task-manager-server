# Task Manager Backend

Backend API for Task Manager App

Made using (NodeJs/ExpressJs, Typescript, Prisma)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=8080`

`NODE_ENV=production`

`DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"`

## Installation

Install the project

```bash
  git clone https://github.com/hamidhasibul/task-manager-server.git
  cd <project dir>
  npm install
```

Synchronize Prisma schema with your database schema.

```bash
  npx prisma db push
```

Build the project

```bash
  npm run build
```

## Run Locally

Make sure to build the project

Start the server

```bash
  npm start
```

server should run on http://localhost:8080

## Troubleshoot

If the client is running on any other port than 3000 then CORS might block the request. In that case, add the origin in allowed-origins.ts file and build the project again.
