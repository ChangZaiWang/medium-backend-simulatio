const express = require('express');
const router = express.Router();
const ClapController = require('../controllers/clap.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const auth = require('../middleware/auth.middleware');

const { createClapSchema } = require('../middleware/validators/clapValidator.middleware');

// GET //
// Clap count
router.get('/:target_id', awaitHandlerFactory(ClapController.ClapCount))

// POST //
// Clap
router.post('/:target_id', auth(), createClapSchema, awaitHandlerFactory(ClapController.clap))

module.exports = router;