const express = require('express');
const router = express.Router();

//route for '/'
router.get('/', (req, res) => {
    res.send('Server is up and running');
});

//route for '/chat'
router.get('/chat', (req, res) => {
    res.send('Chat route');
});

module.exports = router; 