const express = require('express');

const authRoute = require('./routes/authRouter')
const router =express();

router.use('/auth', authRoute);

module.exports = router;