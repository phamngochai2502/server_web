import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
    id : Number,
    nhietDo : Number,
    doAm :Number ,
    anhSang : Number
})

const status = mongoose.model('farmStatus',statusSchema);
module.exports = status;
