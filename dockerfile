FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npx prisma generate 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "botup"]
