const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/story.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth.middleware');

const { createStorySchema, updateStorySchema } = require('../middleware/validators/storyValidator.middleware');

// GET // 
// Get all stories
router.get('/', awaitHandlerFactory(StoryController.getAllStories));
// Get story by id
router.get('/:id', awaitHandlerFactory(StoryController.getStoryById));

// POST //
// Create story
router.post('/', auth(), createStorySchema, awaitHandlerFactory(StoryController.createStory));

// PUT //
// Update story
router.put('/:id', auth(), updateStorySchema, awaitHandlerFactory(StoryController.updateStory));

// DELETE //
// Delete story
router.delete('/:id', auth(), awaitHandlerFactory(StoryController.deleteStory));

module.exports = router;