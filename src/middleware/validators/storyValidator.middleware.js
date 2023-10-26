const { body } = require('express-validator');

exports.createStorySchema = [
    body('title')
        .exists()
        .withMessage('Title is required')
        .isLength({ max: 25 })
        .withMessage('Title can contain up to 25 characters'),        
    body('content')
        .exists()
        .withMessage('Content is required'),
    body('is_premium')
        .exists()
        .withMessage('You should set whether is premium')
        .isInt()
        .withMessage('It must be a integer in 0 or 1')
        .isIn([0, 1])
        .withMessage('It must be 0 or 1')
];

exports.updateStorySchema = [
    body('title')
        .optional(),
    body('content')
        .optional(),
    body('is_premium')
        .optional(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['title', 'content', 'is_premium'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
