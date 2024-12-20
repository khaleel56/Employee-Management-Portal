const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

// const router = require('./router')
const dbConnection = require('./utils/database');
const User = require('./models/UserModel')

dotenv.config();
const app = express();
const port = process.env.PORT || 4001

dbConnection.connect(process.env.DATABASEURL)
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch(err => {
        console.log('Database connection failed')
        throw err;
    });

app.use(cors())
app.use(express.json())

app.get('/app/user/getUsers', async (req, res) => {
    try {
        console.log(req)
        const users = await User.find({ active: true }).lean();
        return res.status(200).json({ users: users })
    }
    catch (err) {
        // errorController.logError(err, 'get list Failed', 500, 'get list', 'GET', {})
        return res.status(500).json({ error: 'get list Failed', err });
    }
})
app.use('*', (req, res, next) => {
    res.status(404).json({ message: `Can't find ${req.originalUrl} on this server` })
})

// app.use(errorLog)
app.listen(port, () => { console.log(`Server running on port ${port}`) })