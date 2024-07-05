FROM node:20.1.0

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN apt-get update

RUN apt-get install -y build-essential libpq-dev

RUN npm install


COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]