FROM node:14 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
RUN npm run types

COPY . .

FROM base as production

# Used in the package json file
ENV NODE_PATH=./build

RUN npm run server:build
