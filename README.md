# Task App
![backend-node-version](https://img.shields.io/static/v1?label=node&message=v14.0&color=brightgreen)
![frontend-node-version](https://img.shields.io/static/v1?label=react&message=v16.1&color=brightgreen)
![jest-test-status](https://img.shields.io/static/v1?label=test&message=passing&color=brightgreen)

A todo app built using Node.js and React

## Requirements
The following marked requirements were achieved in this application.

- React.js app:
  - [x] As an app user, I should be able to view, create and delete a task;
  - [x] The task can be as simple as a date/time and a note;
  - [x] The layout has a header, a footer, and buttons using CareLuLu's layout
  - [x] Users can sign up/log in/log out and tasks are linked to users (i.e. users can only view, create and delete their own tasks);
  - [x] Use Apollo GraphQL.
- Node.js server:
  - [ ] REST API with endpoints to list, create and delete tasks;
  - [x] Migration code or SQL script to prepare and seed a MySQL database;
  - [x] The API exposes sign-up and log-in endpoints and tasks are linked to users;
  - [x] Your code has tests (we suggest using Chai, Mocha and Sinon);
  - [x] Instead of REST API, expose GraphQL endpoints to list, create and delete tasks.

## Tech Stack
- Node.js
  - Express
  - GraphQL
  - MySQL
  - jest 
  - supertest

- React
  - Apollo Client
  - Material UI

- Docker (**Please make sure you have updated version of docker which has the compose command integrated in it**)
   
## How To Run
We have provided a script named `run.sh` in the root directory which will:
 - Setup and run dockerized backend
 - Seed data into the database
 - Setup and run frontend

1. Clone the repository
2. Make sure your docker engine is up and running
3. cd into the repository's main folder
4. Run the following command:
   ```sh
   $ ./run.sh
   ```

## How to run test
1. Make sure your backend docker container is up and running (following the previous steps).
2. Run the following command
  ```sh
  $ docker compose run node npm test
  ```

## Dummy Deta Details
- Credentials to log in (user 1):
  - `username`: Austin66
  - `password`: admin

- Credentials to log in (user 2):
  - `username`: Norman23
  - `password`: admin



## Preview

Some screenshots to get started
<img width="1440" alt="Screenshot 2022-06-23 at 12 46 38 AM" src="https://user-images.githubusercontent.com/22542808/175142388-e06c727a-abdd-4815-a24f-2c955a4af4f8.png">
<img width="1440" alt="Screenshot 2022-06-23 at 12 46 59 AM" src="https://user-images.githubusercontent.com/22542808/175142369-c1f0f968-7f2c-49cf-af4a-e0c611d782e2.png">
<img width="1440" alt="Screenshot 2022-06-23 at 12 48 04 AM" src="https://user-images.githubusercontent.com/22542808/175142459-a3f852ea-f40b-4ba2-b272-dd0e6b9972a8.png">
<img width="1440" alt="Screenshot 2022-06-23 at 12 48 56 AM" src="https://user-images.githubusercontent.com/22542808/175142471-96a2bbf3-ef44-4c40-a14e-29007788d0e1.png">


