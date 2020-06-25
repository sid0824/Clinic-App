
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:8.9.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . /usr/app

EXPOSE 3000

RUN npm run build