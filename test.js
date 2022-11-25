const { Kafka } = require("kafkajs");
const avro = require("avsc");
const { Partitioners } = require('kafkajs');
let i = 0;
const main = async () => {
    i = i+1;
    const type = avro.Type.forSchema({
        type: 'array',
        items: {
            type: 'record', fields:
                [{ name: 'id', type: 'int' },
                { name: 'nhietDo', type: 'int' },
                { name: 'doAm', type: 'int' },
                { name: 'anhSang', type: 'int' }]
        }
    });
    const kafka = new Kafka({
        clientId: "my-app",
        brokers: ["localhost:9092"],
    });
    
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

    await producer.connect();

    const encodedValue = type.toBuffer([
        {
            "id": i,
            "nhietDo": Math.floor(Math.random() * 40),
            "doAm": Math.floor(Math.random() * 100),
            "anhSang": Math.floor(Math.random() * 22)
        }]);
    await producer.send({
        topic: "test-topic",
        messages: [{ value: encodedValue }],
    });

    await producer.disconnect();

    const consumer = kafka.consumer({ groupId: "test-group-1" });

    await consumer.connect();
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const decodedValue = type.fromBuffer(message.value);
            console.log(decodedValue);
        },
    });
};

setInterval(() => {
    main();
}, 1000);
