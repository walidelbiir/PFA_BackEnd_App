FROM node:latest

WORKDIR /WellDone_Backend
COPY . /WellDone_Backend/
EXPOSE 5000
EXPOSE 5001
RUN  npm i 

ENTRYPOINT [ "npm" , "start" ]