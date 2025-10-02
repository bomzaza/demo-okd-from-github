FROM node:18-slim

# ติดตั้ง nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD sh -c "node server.js & nginx -g 'daemon off;'"
