# # Build
FROM node:8.15.1 AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -qy
COPY . .
RUN npm run build:development

# # Production environment
# Stage 2 - the production environment
FROM nginx:1.15.12-alpine
COPY --from=builder /usr/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]