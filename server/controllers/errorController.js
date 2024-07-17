const ErrorLog = require('../models/errorLogs')

exports.logError = async(err=null, errMessage='', statusCode = 500, route='', method='', requestBody='' ) =>{
    try{
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
        return Promise.resolve()
    }
}