FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY .env ./

RUN npm install

RUN npm install -g nodemon

RUN npm install -g typescrip

COPY . .

RUN tsc

EXPOSE 80

CMD ["npm", "start"]

