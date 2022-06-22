const express = require('express');
const router = express.Router();
const moviesApiController = require('../../controllers/api/moviesApiController');

router.get('/', moviesApiController.list);
router.get('/:id', moviesApiController.detail);
//Rutas exigidas para la creación del CRUD
router.post('/', moviesApiController.create);
router.delete('/:id', moviesApiController.delete);

//===================================================
router.put('/movies/update/:id', moviesApiController.update);
router.get('/movies/delete/:id', moviesApiController.delete);

module.exports = router;