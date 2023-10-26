const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');

// GET //
router.get('/', auth(), awaitHandlerFactory(UserController.getAllUsers));
router.get('/:id', auth(), awaitHandlerFactory(UserController.getUserById));
router.get('/username/:username', auth(), awaitHandlerFactory(UserController.getUserByuserName));
router.get('/myprofile', auth(), awaitHandlerFactory(UserController.getCurrentUser));
router.get('/premiumUser', auth(Role.Admin, Role.Premium), awaitHandlerFactory(UserController.getPremiumUser))

// POST //
router.post('/register', createUserSchema, awaitHandlerFactory(UserController.createUser));
router.post('/login', validateLogin, awaitHandlerFactory(UserController.userLogin));

// PUT //
router.put('/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(UserController.updateUser));

// DELETE //
router.delete('/:id', auth(Role.Admin), awaitHandlerFactory(UserController.deleteUser));

module.exports = router;