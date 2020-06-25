
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:8.15.1

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . /usr/app

EXPOSE 3000

CMD ["npm", "build"]