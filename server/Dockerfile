FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copies everything over to Docker environment
COPY . .

EXPOSE 3000

# Finally runs the application
CMD [ "npm", "start" ]