FROM node:16-alpine
WORKDIR /api

COPY . /app

# run these commands
RUN ["npm", "ci"]
CMD ["npm", "start"]