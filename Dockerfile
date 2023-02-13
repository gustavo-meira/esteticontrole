FROM node:lts-alpine3.17
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build
EXPOSE 3000
ENV HOST=http://localhost:3000
CMD ["yarn", "start"]