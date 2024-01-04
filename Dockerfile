FROM node:21-alpine3.19
COPY . .
EXPOSE 3000:3000
ENTRYPOINT ["node", "."]