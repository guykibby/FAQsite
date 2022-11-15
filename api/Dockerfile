FROM node:16-alpine
WORKDIR /api

COPY . /api

# run these commands
RUN ["npm", "ci"]
CMD ["npm", "start"]