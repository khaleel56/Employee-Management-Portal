const mongoose =require('mongoose');
const ErrorLog = require('../models/errorLogs')

exports.logError = async(input) =>{
    try{
        const {err=null, errMessage='', statusCode = 500, route='', method='', requestBody='' } =input
        const errorLog = await ErrorLog.create({
            err,
            errMessage,
            statusCode,
            route,
            method,
            requestBody
        });
        return Promise.resolve();
    }
    catch{
        return Promise.reject()
    }
}