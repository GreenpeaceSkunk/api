FROM node:16 as base

WORKDIR /home/app/api

COPY package*.json ./

RUN npm install
RUN npm run types

COPY . .

FROM base as test

# Used in the package json file
ENV NODE_PATH=./build
RUN npm run server:build

FROM base as production

# Used in the package json file
ENV NODE_PATH=./build
RUN npm run server:build
