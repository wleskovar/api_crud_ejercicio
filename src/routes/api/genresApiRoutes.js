const express = require('express');
const router = express.Router();
const genresApiController = require('../../controllers/api/genresApiController');

router.get('/genres', genresApiController.list);
router.get('/genres/:id', genresApiController.detail);


module.exports = router;