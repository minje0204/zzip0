FROM node:16.16.0-alpine

#WORKDIR /var/jenkins_home/workspace/a401/sti

#의존성 설치
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

#next.js 앱 빌드
RUN npx next build

EXPOSE 3000

CMD [ "npx", "next", "start" ]
