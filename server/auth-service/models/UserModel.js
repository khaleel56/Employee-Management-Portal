const mongoose = require('mongoose');

const _schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    userName:{
        type:String
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    active:{
        type:Boolean,
        default:true
    },
    portalAccess:{
        type:Boolean,
        default:false
    },
    invalidLoginCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date,
    },
    deletedAt:{
        type:Date,
    }
}, {timestamps:true});

const _model = mongoose.model('users', _schema)
module.exports =_model