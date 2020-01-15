FROM debian:latest

SHELL [ "/bin/bash", "-l", "-c" ]
RUN apt-get update && apt-get install -y git npm maven default-jre curl

RUN git config --global url."https://bd89edfd7260c3fd49ceb3903ec8110f79dab793:@github.com/".insteadOf "https://github.com/"

RUN git clone https://github.com/RMIT-SEPT/InSEPtion.git

RUN cd InSEPtion && git checkout docker

RUN cd InSEPtion && git fetch && git pull

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash 

RUN nvm install 10.15.3

RUN cd InSEPtion/frontend/todo-app/ && rm -rf node_modules && npm install 

RUN cd InSEPtion/restful-web-services && mvn install

EXPOSE 80
EXPOSE 8080

CMD ["cd InSEPtion/restful-web-services && mvn spring-boot:run & cd InSEPtion/frontend/todo-app/ && npm start"]