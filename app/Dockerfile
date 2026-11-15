FROM nginx:alpine

ARG APP_VERSION=1.0
ENV APP_VERSION=${APP_VERSION}

COPY grupo4-f1/ /usr/share/nginx/html/
RUN chmod -R a+rX /usr/share/nginx/html

COPY docker/default.conf /etc/nginx/conf.d/default.conf

COPY docker/40-container-info.sh /docker-entrypoint.d/40-container-info.sh

RUN chmod +x /docker-entrypoint.d/40-container-info.sh

EXPOSE 80
