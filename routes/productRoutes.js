const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: list of products
 */
router.get('/api', productController.apiIndex);

router.post('/api', productController.apiCreate);
router.get('/api/:id', productController.apiShow);
router.put('/api/:id', productController.apiUpdate);
router.delete('/api/:id', productController.apiDelete);

// Web routes (EJS)
router.get('/', productController.index);
router.get('/new', productController.newForm);
router.post('/', productController.create);
router.get('/:id/edit', productController.editForm);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;