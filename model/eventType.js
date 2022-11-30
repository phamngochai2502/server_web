import avro from 'avsc';

export default avro.Type.forSchema({
    type: 'record',
    fields:
        [
            { name: 'time', type: 'string' },
            { name: 'temp', type: 'double' },
            { name: 'humidity', type: 'double' },
            { name: 'moisture', type: 'double' },
            { name: 'moistureSts', type: 'int' },
            { name: 'tempSts', type: 'int' }
        ]
});