FROM node:current-slim

WORKDIR .

COPY package.json .

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "sandbox"]

COPY . .