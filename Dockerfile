FROM nginx:alpine
RUN apk add --no-cache apache2-utils
COPY docker-entrypoint.d/99-trip-auth.sh /docker-entrypoint.d/99-trip-auth.sh
RUN chmod +x /docker-entrypoint.d/99-trip-auth.sh
