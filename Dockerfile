FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install

COPY . .

EXPOSE 6060
CMD [ "npm", "run", "dev" ]