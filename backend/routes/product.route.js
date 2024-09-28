import express from 'express';

import { getProducts, createProduct, deleteProduct, updatedProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updatedProduct);

export default router;
