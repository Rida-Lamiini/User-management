FROM node:20

WORKDIR /app

# ✅ Install netcat-openbsd instead of netcat
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

# Add wait script
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

CMD ["/wait-for-mysql.sh", "localhost", "npm", "test"]
