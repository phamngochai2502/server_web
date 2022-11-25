-- import setting in pakage.json
npm install
yarn init -y

-- start docker container : 
 docker-compose up

-- start producer  
npm run start:producer

-- start consumer
npm run start:consumer

-- stop docker container :
docker-compose down 

-- start mongoDb sever 
brew services start mongodb/brew/mongodb-community

-- port db 
mongosh --port 27017