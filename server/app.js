const express = require('express')
const dotenv = require('dotenv')

const router = require('./router')
const dbConnection = require('./utils/database')
// const errorLog = require('./controllers/errorController')

dotenv.config();
const app = express();
const port = process.env.PORT || 4000

dbConnection.connect(process.env.DATABASEURL)
.then(() => {
  console.log('Database connected successfully')
  })
.catch(err => {
  throw err;
});

app.use(express.json())

app.use('/app', router)
app.use('*', (req, res, next)=>{
    res.status(404).json({message:`Can't find ${req.originalUrl} on this server`})
})
// app.use(errorLog)
app.listen(port, ()=>{console.log(`Server running on port ${port}`)})