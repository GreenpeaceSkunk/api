FROM node:16 as base

WORKDIR /home/app/coupon

ENV PATH /home/app/coupon/node_modules/.bin:$PATH

COPY package*.json ./
COPY .npmrc ./

RUN npm install react-scripts -g
RUN npm install --legacy-peer-deps
RUN npm run types

COPY . .

FROM base as production

# Used in the package json file
ENV NODE_PATH=./build
CMD [ "npm", "run", "client:start:production" ]

FROM base as test

# Used in the package json file
ENV NODE_PATH=./build
CMD [ "npm", "run", "client:start:test" ]
