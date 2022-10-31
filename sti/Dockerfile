FROM node:16.16.0-alpine

WORKDIR /usr/src/app

#의존성 설치
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

#next.js 앱 빌드
RUN npm run build

EXPOSE 3000

CMD [ "yarn", "start" ]