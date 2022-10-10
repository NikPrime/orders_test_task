FROM node:14-alpine3.10

WORKDIR /app

EXPOSE 3000

COPY package*.json ./
COPY . .

RUN npm install
RUN npm install @nestjs/cli

CMD ["npm", "run", "start"]
