import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'products-db.json');

export class ProductDao {
  async _readFile() {
    const data = await readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  }

  async _writeFile(data) {
    await writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getAllProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    const product = products.find(p => p.product_id === id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProduct(productData) {
    const products = await this._readFile();
    const nextId = products.length ? Math.max(...products.map(p => p.product_id)) + 1 : 1;
    const newProduct = {
      product_id: nextId,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      isActive: true,
      ...productData,
    };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updatedData) {
    const products = await this._readFile();
    console.log(`id:${id}`);
    console.log(JSON.stringify(products));
    const index = products.findIndex(p => p.product_id === id);
    if (index === -1) throw new Error('Product not found');
    products[index] = { ...products[index], ...updatedData };
    await this._writeFile(products);
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this._readFile();
    const index = products.findIndex(p => p.product_id === id);
    if (index === -1) throw new Error('Product not found');
    const deleted = products.splice(index, 1);
    await this._writeFile(products);
    return deleted[0];
  }
}