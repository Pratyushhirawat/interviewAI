FROM node

WORKDIR /app

COPY package*json ./
RUN npm install
COPY ./services/roadmap/package*json ./services/roadmap/
RUN npm install 
COPY services/roadmap ./services/roadmap
COPY shared ./shared
WORKDIR /app/services/roadmap

EXPOSE 8004

CMD ["npm","start"]