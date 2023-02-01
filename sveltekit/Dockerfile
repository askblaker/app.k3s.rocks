FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-alpine AS deploy

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/start.sh .
COPY --from=build /app/build ./build
COPY --from=build /app/src ./src
COPY --from=build /app/static ./static
RUN npm install --omit=dev
CMD ["./start.sh"]