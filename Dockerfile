FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN sudo npm install -g knex
COPY . .
EXPOSE 3000
RUN knex migrate:latest
CMD ["npm","start"]
