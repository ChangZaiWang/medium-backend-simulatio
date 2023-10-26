const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmark.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth.middleware');

const { createBookmarkSchema, updateBookmarkSchema } = require('../middleware/validators/bookmarkValidator.middleware');

// POST //
// Create bookmark
router.post('/', auth(), createBookmarkSchema, awaitHandlerFactory(BookmarkController.createBookmark))
// Save
router.post('/save/:story_id', auth(), awaitHandlerFactory(BookmarkController.save))
// Save to specific list
router.post('/save/:story_id/:bookmark_id', auth(), awaitHandlerFactory(BookmarkController.saveAss))

// PUT //
// Update bookmark
router.put('/:bookmark_id', auth(), updateBookmarkSchema, awaitHandlerFactory(BookmarkController.updateBookmark))

// DELETE //
// Delete boomark
router.delete('/:bookmark_id', auth(), awaitHandlerFactory(BookmarkController.deleteBookmark))
// Unsave
router.delete('/unsave/:story_id/:bookmark_id', auth(), awaitHandlerFactory(BookmarkController.unsave))

module.exports = router;