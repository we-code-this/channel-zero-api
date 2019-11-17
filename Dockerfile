FROM node:12

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

COPY prod.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/prod.sh
ENTRYPOINT ["prod.sh"]

CMD ["npm", "run", "start"]
