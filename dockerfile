#BUILDER
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

#RUNNER
FROM node:23-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/interface.js ./interface.js

EXPOSE 727

CMD ["node", "interface.js"]
