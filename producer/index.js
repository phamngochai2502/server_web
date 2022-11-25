console.log('producer ...');
import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const stream = Kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
}, {}, { topic: 'test', topic :'test1' });

stream.on('error', (err) => {
    console.error('Error in our kafka stream');
    console.error(err);
});

function queueRandomMessage() {
    const encodedValue =
    {
        "id": Math.floor(Math.random() * 10000),
        "nhietDo": Math.floor(Math.random() * 60),
        "doAm": Math.floor(Math.random() * 100),
        "anhSang": Math.floor(Math.random() * 800)
    };
    const success = stream.write(eventType.toBuffer(encodedValue));
    if (success) {
        console.log('write success ');
    } else {
        console.log('somthing went wrong ...');
    }
}

setInterval(() => {
    queueRandomMessage();
}, 5000);


