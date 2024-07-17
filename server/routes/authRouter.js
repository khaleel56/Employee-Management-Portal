const express = require('express');

const authenticateController = require('../controllers/authencticateController')

const router = express.Router()

router.post('/register', authenticateController.register);
router.post('/login', authenticateController.login)



module.exports = router