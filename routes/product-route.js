import { Router } from 'express';
const router = Router();
import ProductController from '../controllers/product-controller.js'
import { ApiError } from '../errors/api-error.js'

const productController = new ProductController();

router.get('/', async (req, res, next) => {
    await productController.getProducts(req, res, next);
});

router.post('/', async (req, res, next) => {
    await productController.createProduct(req, res, next);
});

router.put('/:id', async (req, res, next) => {
    await productController.updateProduct(req, res, next);
});

router.delete('/:id', async(req, res, next) => {
    await productController.deleteProduct(req, res, next);
});

export default router;