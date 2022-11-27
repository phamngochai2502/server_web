console.log('consumer ...');
import data from '../mail/mail.json' assert { type: "json" };
import nodeMailer from 'nodemailer';
import cron from 'node-cron';
const lstMail = data["email"];

import Kafka from 'node-rdkafka';
import eventType from '../model/eventType.js';

import express from 'express';
import { Server, Socket } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';

import mongodb from 'mongodb';
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

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

const consumer = Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
}, {});

//
const tranPost = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: 'boybeobanhbao1@gmail.com',
        pass: 'frrhrtakkiswaojp'
    }
});

let checkSendMail = true;
//


consumer.connect();
let nhietDoS = 0;
let doAmS = 0;
let anhSangS = 0;
// read data from topic
consumer.on('ready', () => {
    console.log('consumer ready..');
    consumer.subscribe(['test', 'test1']);
    consumer.consume();
}).on('data', (data) => {
    console.log('consumer.on() take data from topic and sent to client use socket.io');
    const dataTake = JSON.stringify(eventType.fromBuffer(data.value));
    const jsonTake = JSON.parse(dataTake);
    console.log("id = " + jsonTake.id + " nhietDo = " + jsonTake.nhietDo + " doAm = " + jsonTake.doAm + " anhSang = " + jsonTake.anhSang);
    nhietDoS = jsonTake.nhietDo;
    doAmS = jsonTake.doAm;
    anhSangS = jsonTake.anhSang;
    // send mail 
    if (nhietDoS > 45 || (doAmS < 60 || doAmS > 70) || (anhSangS < 400 || anhSangS > 700)) {
        // gửi mail cảnh báo đến mail của chủ vườn cây
        if (checkSendMail === true) {
            let mailSend = {
                from: 'boybeobanhbao1@gmail.com',
                to: lstMail,
                subject: 'Cảnh báo điều chỉnh môi trường cho vườn cây',
                text: 'hai dep trai'
            }
            tranPost.sendMail(mailSend, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`send mail to ${lstMail} success ! `);
                    checkSendMail = false;
                }
            });
        }
    // use Node Cron điều chỉnh nhịp độ gửi mail cảnh báo
        var today = new Date();
        let minute = today.getMinutes() - 1;
        if (minute === (-1)) {
            minute = 59;
        }
        let time = minute + ' */1 * * *';
        cron.schedule(time + "'", () => {
            checkSendMail = true;
        });
    }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("tutorialMongoDB");
        var myobj =
            { id: jsonTake.id, nhietDo: nhietDoS, doAm: doAmS, anhSang: anhSangS }
            ;
        dbo.collection("farmStatus").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

});
// send data to web  
// use : socket.io.on 
// call function sendData(socket,nhietDo,doAm,anhSang)
io.on('connection', (socket) => {
    console.log("connection is connected");
    sendData(socket, nhietDoS, doAmS, anhSangS);
});

function sendData(socket, a1, a2, a3) {
    socket.emit('data1', a1, a2, a3);
    console.log("data have been sent : " + a1 + " " + a2 + " " + a3);
    setTimeout(() => {
        sendData(socket, nhietDoS, doAmS, anhSangS);
    }, 5000);
}

