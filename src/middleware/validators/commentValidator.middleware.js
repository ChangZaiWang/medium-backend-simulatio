const { body } = require('express-validator');

exports.createCommentSchema = [
    body('content')
        .exists()
        .withMessage('Content is required'),
];

exports.updateCommentSchema = [
    body('content')
        .exists()
        .withMessage('Content is required'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['content'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];