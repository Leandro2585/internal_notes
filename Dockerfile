FROM node:16

WORKDIR /usr/src/internal_notes_v1

COPY ./package.json .

COPY ./ormconfig.js .
COPY ./tsconfig.json .
COPY ./tsconfig-build.json .

EXPOSE 3333

RUN npm install

COPY . .

CMD ["run", "start"]
