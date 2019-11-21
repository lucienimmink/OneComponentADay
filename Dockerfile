FROM nginx:1.17.6-alpine

COPY ./dist /usr/share/nginx/html/
COPY ./dist /etc/nginx/html
COPY ./.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80