const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follow.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth.middleware');

// POST //
// Follow
router.post('/:follow_id', auth(), awaitHandlerFactory(FollowController.follow))
// DELETE //
// Unfollow
router.delete('/:follow_id', auth(), awaitHandlerFactory(FollowController.unfollow))

module.exports = router;