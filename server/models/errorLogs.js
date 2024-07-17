const mongoose =require('mongoose');

const _schema = new mongoose.Schema({
    method:{
        type:String,
    },
    route:{
        type:String
    },
    requestBody:{
        type:String
    },
    statusCode: {
        type: Number
    },
    error:{
        type:mongoose.Schema.Types.Mixed
    }
}, {
    timestamps:true
})

const _model = mongoose.model('errorLogs', _schema);
module.exports =_model;