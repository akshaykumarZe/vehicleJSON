# Use an official Node.js image as the base (Alpine is lightweight)
FROM node:18-alpine

# Set environment variables (optional, can help with performance and logging)
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the application port (adjust according to your app)
EXPOSE 3000

# Start the application (adjust if you're not using an index.js entry point)
CMD ["node", "index.js"]
