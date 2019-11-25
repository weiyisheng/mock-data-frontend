FROM node:10.16

WORKDIR /usr/src/app

ENV VERSION=1

RUN yarn config set registry 'https://registry.npm.taobao.org' 

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn install

COPY . .

# RUN yarn run build

EXPOSE 9413:3000

CMD ["yarn", "run", "stage"]


