FROM node as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
COPY . /app

ENV VITE_URL=/api/

RUN npm run build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
