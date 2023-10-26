const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth.middleware');

const { createCommentSchema, updateCommentSchema } = require('../middleware/validators/commentValidator.middleware');

// GET //
// Get story comments
router.get('/:story_id', auth(), awaitHandlerFactory(CommentController.getComments));
// Get replies
router.get('/:comment_id/replies', auth(), awaitHandlerFactory(CommentController.getReplies));

// POST //
// Comment to a story
router.post('/:story_id', auth(), createCommentSchema, awaitHandlerFactory(CommentController.createComment));
// reply to a comment
router.post('/:story_id/reply/:comment_id', auth(), createCommentSchema, awaitHandlerFactory(CommentController.createReply));

// PUT //
// Update a comment/reply
router.put('/:comment_id', auth(), updateCommentSchema, awaitHandlerFactory(CommentController.updateComment));

// DELETE //
// Delete a comment/reply
router.delete('/:comment_id', auth(), awaitHandlerFactory(CommentController.deleteComment));

module.exports = router;