FROM node:10-alpine
WORKDIR /usr/src/app
ENV VERSION=1
COPY ./package*.json ./

RUN npm config set registry 'https://registry.npm.taobao.org'
RUN npm install

COPY . .
RUN npm build
CMD ["npm", "run", "stage"]


