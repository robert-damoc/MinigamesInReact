FROM node:11.9-alpine

RUN apk add --no-cache bash

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN yarn --force

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
