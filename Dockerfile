FROM node:lts-buster

# Update and install necessary dependencies
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*

# Clone the xforcemd repository from cobutech's GitHub
RUN git clone https://github.com/cobutech/MORTAL-KOMBAT-MD/root/MORTAL-KOMBAT_Bot

# Set working directory
WORKDIR /root/MORTAL-KOMBAT-Bot/

# Copy the package.json and install dependencies
COPY package.json .
RUN npm install -g npm@10.2.4 && \
  npm install --legacy-peer-deps

# Copy the entire codebase
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
