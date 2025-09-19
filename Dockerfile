# --- deps ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=optional

# --- build ---
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Si copias vistas/estáticos con Nest, decláralos en nest-cli.json (assets)
RUN npm run build   

# --- runtime ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# (opcional) define el puerto por variable, Nest por defecto usa 3000
ENV PORT=3001

# Copiamos solo lo necesario para runtime
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE ${PORT}
# Healthcheck sencillo (ajusta la ruta si tienes /health)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:${PORT}/ || exit 1

CMD ["node", "dist/main.js"]
