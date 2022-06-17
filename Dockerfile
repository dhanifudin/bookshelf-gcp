FROM node:14-alpine
LABEL Maintainer="Dian Hanifudin Subhi <dhanifudin@gmail.com>"

WORKDIR /app

COPY app/ /app
COPY app/.env.example /app/.env

COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN apk --no-cache add nginx supervisor && \
  npm install

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
