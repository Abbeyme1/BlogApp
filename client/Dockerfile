# FROM node:alpine
# FROM node:13.12.0-alpine

# ENV CI=true

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . .

# CMD [ "npm","start" ]



FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./

RUN npm install

COPY . .

CMD [ "npm","start" ]
