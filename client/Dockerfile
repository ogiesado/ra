FROM node:19
WORKDIR /app
# VOLUME . /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 8082
CMD ["npm", "run", "dev"]