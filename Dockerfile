# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

# Build the React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

RUN echo 'we are running some # of cool things'

# FROM ngrok/ngrok:latest

RUN git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew \
&& mkdir ~/.linuxbrew/bin \
&& ln -s ../Homebrew/bin/brew ~/.linuxbrew/bin \
&& eval $(~/.linuxbrew/bin/brew shellenv) \
&& brew --version && brew install ngrok/ngrok/ngrok


RUN ngrok version;

RUN ngrok authtoken 2QL2iBGPQDjibWP4mTpjRvrYPRi_3HWKfvfVpi1PEvU8ZAvd1

# Define the entry point for the container
# CMD ["npm", "start"]