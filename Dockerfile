FROM node:20-slim

WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install 
COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]
