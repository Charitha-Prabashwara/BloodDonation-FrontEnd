# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

CMD ["npm", "run", "build"]

CMD ["npm", "run", "host"]

EXPOSE 80

