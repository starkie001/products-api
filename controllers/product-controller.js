import { ProductDao } from "../dao/product-dao.js";
import { ProductValidator } from "../validators/product-validator.js";

export default class ProductController {
    
    constructor() {
        this.productDao = new ProductDao();
    }

    async getProducts(req, res, next) {
        const products = await this.productDao.getAllProducts();
        res.json(products).status(200);
    }

    async createProduct(req, res, next) {
        try {
            const product = req.body;
            ProductValidator.validateCreate(product);
            await this.productDao.createProduct(product);
            res.status(200).json(product);
        }
        catch(error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const id = Number(req.params.id);
            const product = req.body;
            await this.productDao.updateProduct(id, product);
            res.json(product).status(200);
        }
        catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const id = Number(req.params.id);
            const product = await this.productDao.deleteProduct(id);
            res.status(200).json(product);
        }
        catch (error) {
            next(error);
        }
    };


}