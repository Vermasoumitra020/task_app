FROM node:14.0-alpine3.11

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# If you are building your code for production
RUN npm install #npm ci --only=production

# Bundle app source
COPY . /usr/src/app/

# Install Dev Dependencies Globally
RUN npm install -g nodemon jest supertest

# Create app directory
WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
