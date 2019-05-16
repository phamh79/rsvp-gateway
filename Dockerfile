FROM node:10.15.3-alpine
# Create app directory
WORKDIR /usr/src/app
#Copy package and package .json to install dependency
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
CMD [ "npm", "start" ]

