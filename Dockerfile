FROM node:23-alpine

COPY ./src /app/src/

COPY ./rules /app/rules/

WORKDIR /app/src/

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start"]