FROM node:11.9

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]
