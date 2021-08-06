FROM node:16-alpine3.11

WORKDIR /usr/app
COPY ./ /usr/app/

RUN yarn install
RUN yarn build

EXPOSE 3001

CMD ["yarn", "start:prod"]