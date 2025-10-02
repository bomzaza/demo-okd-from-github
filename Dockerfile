FROM node:18-alpine

# ติดตั้ง nginx
RUN apk add --no-cache nginx

# ตั้ง working dir
WORKDIR /app

# copy package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install --only=production

# copy source code
COPY . .

# copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# prepare log + runtime dir ของ nginx
RUN mkdir -p /run/nginx

EXPOSE 80

# start Express.js + nginx พร้อมกัน
CMD sh -c "node index.js & nginx -g 'daemon off;'"
