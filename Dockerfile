# ---- build stage: compile the Vite app ----
FROM node:22-bookworm-slim AS build
WORKDIR /app
ENV CI=true
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Public URL baked into canonical/OG links and the sitemap (passed from docker-compose)
ARG VITE_SITE_URL=
ENV VITE_SITE_URL=${VITE_SITE_URL}
RUN npm run build

# ---- runtime stage: nginx serving the static build ----
FROM nginx:1.27-alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/vigyan-sarathi.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
