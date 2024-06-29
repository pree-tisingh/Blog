
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlog);
router.post('/', blogController.createBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
