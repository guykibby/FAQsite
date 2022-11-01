FROM node:16-alpine
WORKDIR /app

COPY . /app

EXPOSE 5001

# run these commands
RUN ["npm", "ci"]
CMD ["npm", "start"]