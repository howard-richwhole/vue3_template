FROM nginx

WORKDIR /app

ENV TZ=Asia/Taipei

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/ /app/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
