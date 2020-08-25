FROM node:14-alpine
COPY . .
RUN npm i
CMD ["node", "."]