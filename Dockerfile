FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 4200

# Add --host 0.0.0.0 to ng serve
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
