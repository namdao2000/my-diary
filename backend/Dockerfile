FROM mhart/alpine-node as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM mhart/alpine-node as running

WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./

RUN npm ci --production

CMD ["node", "dist/src/index.js"]