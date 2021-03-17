FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . . 

EXPOSE 8040

CMD yarn start