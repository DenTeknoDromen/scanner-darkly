FROM node:alpine

ADD / app/

WORKDIR /app

COPY . /app/

EXPOSE 4000

RUN npm install

CMD ["npm", "run", "start"]