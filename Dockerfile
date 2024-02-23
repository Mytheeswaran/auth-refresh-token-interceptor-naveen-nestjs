FROM node:18.0.0-alpine
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install -g @nestjs/cli
RUN npm install
COPY . ./
CMD ["npm", "run", "start:dev"]