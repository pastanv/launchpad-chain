FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --omit=dev

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]