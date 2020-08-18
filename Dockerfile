FROM node:14
WORKDIR /server
COPY package*.json ./
RUN npm install
RUN npm install -g pm2
COPY . .
EXPOSE 80 443
CMD ["pm2-runtime", "start", "pm2.json"]