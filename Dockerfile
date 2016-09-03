FROM node:6.0.0
RUN mkdir /src

WORKDIR /src
ADD . /src

EXPOSE 8080

CMD npm run start
