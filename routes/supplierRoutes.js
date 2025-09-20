const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Supplier management
 */

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     tags: [Suppliers]
 *     summary: Get all suppliers
 *     responses:
 *       200:
 *         description: list of suppliers
 */
router.get('/api', supplierController.apiIndex);

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     tags: [Suppliers]
 *     summary: Create a supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: created
 */
router.post('/api', supplierController.apiCreate);

router.get('/api/:id', supplierController.apiShow);
router.put('/api/:id', supplierController.apiUpdate);
router.delete('/api/:id', supplierController.apiDelete);

// Web routes (EJS views)
router.get('/', supplierController.index);
router.get('/new', supplierController.newForm);
router.post('/', supplierController.create);
router.get('/:id/edit', supplierController.editForm);
router.put('/:id', supplierController.update);
router.delete('/:id', supplierController.delete);

module.exports = router;