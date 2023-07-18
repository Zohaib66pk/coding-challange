const express = require('express');

const user = require('../controllers/userController');
const friend = require('../controllers/friendController');

const router = express.Router();

router.get('/search/:userId/:query', user.search);
router.get('/friend/:userId/:friendId', friend.friend);
router.get('/unfriend/:userId/:friendId', friend.unFriend);

module.exports = router;