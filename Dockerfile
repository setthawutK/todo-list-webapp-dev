# Use an official Node runtime as a parent image
FROM node:22 AS builder

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod


FROM nginx:stable-alpine

# Add to the container
COPY --from=builder /usr/src/app/dist/i-leave-webapp/browser /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /nginx.conf

# Add environment
ENV SERVICE_URL=http://i-leave-api-gateway

CMD cat /nginx.conf | envsubst "$(env | awk -F = '{printf " $$%s", $1}')" > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
