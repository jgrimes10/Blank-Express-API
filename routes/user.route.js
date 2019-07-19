const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/test', userController.test);

router.get('/', userController.get_users);

router.get('/:id', userController.get_user);

router.post('/', userController.create_user);

router.put('/:id', userController.update_user);

router.delete('/:id', userController.delete_user);

module.exports = router;
