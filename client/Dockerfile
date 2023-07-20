FROM node
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
COPY . /app
EXPOSE 8000
CMD [ "yarn", "run", "dev" ]
