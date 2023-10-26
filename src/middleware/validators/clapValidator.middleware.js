const { body } = require('express-validator');
const Type = require('../../utils/clapType.utils');

exports.createClapSchema = [
    body('type')
        .exists()
        .withMessage('Type is required')
        .isIn([Type.story, Type.comment])
        .withMessage('Invalid type, must be story or comment'),

];