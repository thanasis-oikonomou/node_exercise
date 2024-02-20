FROM node:20.5-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the production-ready frontend bundle
RUN npm run build

# Expose the port on which the frontend will run (optional)
EXPOSE 3000

# Command to start the frontend server
CMD ["npm", "start"]
