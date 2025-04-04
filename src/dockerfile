#BUILDER
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json interface.js index.html cipher.png styles.css ./
RUN npm ci --only=production

#RUNNER
FROM node:23-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/interface.js ./interface.js
COPY --from=builder /app/index.html ./index.html
COPY --from=builder /app/cipher.png ./cipher.png
COPY --from=builder /app/styles.css ./styles.css


EXPOSE 727

CMD ["node", "interface.js"]
