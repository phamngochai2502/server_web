import avro from 'avsc';

export default avro.Type.forSchema({
    type: 'record',
    fields:
        [
            { name: 'id', type: 'int' },
            { name: 'nhietDo', type: 'int' },
            { name: 'doAm', type: 'int' },
            { name: 'anhSang', type: 'int' }
        ]
});