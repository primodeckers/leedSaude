FROM node:8.12.0

# Create app directory
WORKDIR /home/primodeckers/repository/leedSaude/backend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY ./package*.json ./

RUN npm install && npm install request --save && npm install knex --save
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source

COPY . .

EXPOSE 4000

CMD [ "npm", "start", "knex migrate:latest" ]