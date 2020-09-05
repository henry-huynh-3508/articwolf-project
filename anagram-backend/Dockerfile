FROM node:latest
WORKDIR /app
ENV PORT=8080
COPY . .
RUN npm install
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]