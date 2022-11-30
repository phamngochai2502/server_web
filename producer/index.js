console.log('producer ...');
import Kafka from 'node-rdkafka';
import eventType from '../model/eventType.js';

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, { topic: 'test'});

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

function queueRandomMessage() {
    var today = new Date();
    var time = today.getTime().toString();
 // Math.round(num * 100) / 100
   const encodedValue =
    {
        "time": time,
        "temp": Math.round((Math.random() * 60.0) * 100)/100,
        "humidity": Math.round((Math.random() * 100.0) * 100)/100,
        "moisture": Math.round((Math.random() * 150.0) * 100)/100,
        "moistureSts": Math.floor(Math.random() * 2),
        "tempSts": Math.floor(Math.random() * 2)
    };
    console.log("encodedValue = "+JSON.stringify(encodedValue))
    // const success = stream.write(eventType.toBuffer(encodedValue));
    const success = stream.write(Buffer.from(JSON.stringify(encodedValue)));
    if (success) {
        console.log('write success ');
    } else {
        console.log('somthing went wrong ...');
    }
}

setInterval(() => {
    queueRandomMessage();
}, 5000);


