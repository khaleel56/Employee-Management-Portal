const mongoose = require('mongoose');

exports.connect = (databaseURL) =>{
    return mongoose.connect(databaseURL)
}
