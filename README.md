# My Diary 
This website allows you to write anything into an online diary.

[Live Page](https://my-diary.pages.dev/)

## Frontend
The frontend is written in React, Apollo and Typescript.

## Backend 
The backend of this application is implemented in Expressjs, Typescript and Sqlite3. It has built in JWT Authentication with Bcrypt password storage.

### Features 
- WIP

#### Authentication
- In-house JWT Authentication (powered by jsonwebtoken)
- Stored passwords are hashed using Bcrypt (10 rounds of salting as well)

#### DevOps
- Support for `.env` file

#### SQLite
- SQL Triggers for automatic `updated_at` column update.

#### Observability
- Full logging capability for possible run-time errors
- WIP: Analytics

#### Development
- Epic folder structure to use as a reference for future big boy projects.
- ESLint and Prettier setup for formatting.
- Nodemon for automatic reloading