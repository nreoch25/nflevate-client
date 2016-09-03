FROM node:6.0.0
RUN mkdir /src

WORKDIR /src
ADD . /src
RUN npm install
RUN npm run build

EXPOSE 8080

CMD npm run test
CMD npm run start
