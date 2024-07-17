const express = require('express');

const authenticateController = require('../controllers/authencticateController')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.post('/register', authenticateController.register);
router.post('/login', authenticateController.login);
router.get('/getusers', authMiddleware, authenticateController.getusers)




module.exports = router