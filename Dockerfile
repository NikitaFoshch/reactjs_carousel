FROM node:17-alpine
WORKDIR /usr/app/front
EXPOSE 5173
COPY ./ ./
RUN npm install
CMD ["npm", "run", "dev"]