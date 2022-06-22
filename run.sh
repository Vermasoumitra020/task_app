#!/bin/bash

# commands to start backend service
docker compose -f ./careLULU/docker-compose.yml up --build -d

#command to seed data
cd careLULU && docker compose run node npx sequelize-cli db:seed:all

# command to start frontend service
cd .. && cd carelulu_frontend && ./start.sh
