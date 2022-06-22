FROM node:16.15-alpine3.14

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# If you are building your code for production
RUN npm install #npm ci --only=production

#COPY . /usr/src/app

# Create app directory
WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
