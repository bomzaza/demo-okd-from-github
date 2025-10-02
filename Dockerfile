# Stage 1 - Build Node.js app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Stage 2 - Runtime with Nginx + Node.js
FROM node:20-alpine
WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

# Copy node app
COPY --from=builder /app /app

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Run Nginx + Node.js together
EXPOSE 80
CMD ["sh", "-c", "node index.js & nginx -g 'daemon off;'"]
