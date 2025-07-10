FROM node:22-bullseye

WORKDIR /ptvertice

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]