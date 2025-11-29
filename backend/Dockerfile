FROM node:22.21.1-alpine

WORKDIR /backend

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

COPY . .

EXPOSE 4444

CMD ["node", "index.js"]