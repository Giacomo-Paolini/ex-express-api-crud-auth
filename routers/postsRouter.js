const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { checkSchema } = require('express-validator');
const createPost = require('../validations/createPost');
const tokenJWT = require('../middlewares/tokenJWT');

router.post('/', 
checkSchema(createPost), 
// tokenJWT, 
postsController.store);

router.get('/:slug', postsController.show);
router.get('/', postsController.index);
router.put('/:slug', postsController.update);
router.delete('/:slug', postsController.destroy);

module.exports = router;