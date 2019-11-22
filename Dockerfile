FROM node:10-alpine
WORKDIR /usr/src/app
ENV VERSION=1
COPY ./package*.json ./

RUN echo "https://mirrors.aliyun.com/alpine/v3.9/main/" > /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/v3.9/community/" >> /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/edge/testing/" >> /etc/apk/repositories && \
    npm config set registry 'https://registry.npm.taobao.org' 
RUN apk add --no-cache bash
RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "run", "stage"]


