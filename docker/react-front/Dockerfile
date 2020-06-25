FROM node:12.16.2

WORKDIR /usr/src/app

# キャッシュを効かせるために先にコピー
COPY ./docker/react-front/yarn.lock /usr/src/app/ 
COPY ./docker/react-front/package*.json /usr/src/app/ 

RUN yarn --network-timeout 1000000

# コンテナに全ファイルを転送
COPY ./docker/react-front/ .

EXPOSE 8088 

CMD [ "yarn", "start:docker" ]
