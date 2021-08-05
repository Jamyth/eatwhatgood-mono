FROM node:16-alpine3.11

WORKDIR /usr/app
COPY ./ /usr/app/

RUN yarn install

CMD ["yarn", "start:prod"]