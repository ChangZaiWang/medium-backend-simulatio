const { body } = require('express-validator');

exports.createBookmarkSchema = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Title can contain up to 50 characters'),
    body('is_private')
        .exists()
        .withMessage('You should set whether is private')
        .isInt()
        .withMessage('It must be a integer in 0 or 1')
        .isIn([0, 1])
        .withMessage('It must be 0 or 1')
];

exports.updateBookmarkSchema = [
    body('name')
        .optional(),
    body('is_private')
        .optional(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name', 'is_private'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];