import express from 'express';
import {Server, Socket}  from 'socket.io';
import bodyParser from 'body-parser';
import  cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser);
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});
app.get('/', function (req, res, next) {
    // Handle the get for this route
});
app.post('/', function (req, res, next) {
    // Handle the post for this route
})
const server = app.listen(3000, () => {
    console.log('ls on port 3000');
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log("connection is connected");
    sendData(socket);
});

function sendData(socket) {
    socket.emit('data1', Math.floor(Math.random() * 37)
        , Math.floor(Math.random() * 74)
        , Math.floor(Math.random() * 56)
        , Math.floor(Math.random() * 20));
    console.log("data have been sent");
    setTimeout(() => {
        console.log("time out");
        sendData(socket);
    }, 1000);
}