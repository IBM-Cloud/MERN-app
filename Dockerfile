FROM node:6-alpine

ADD . /usr/app/

RUN apk update
COPY package.json /tmp/package.json
RUN cd /tmp && yarn --quiet
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

WORKDIR /usr/app

CMD ["yarn", "start"]