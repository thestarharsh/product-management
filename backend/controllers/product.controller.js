import mongoose  from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            data: products
        }) ;       
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product || !product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please enter all fields.",
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct,
            message: "Product Created Successfully",
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(404).json({
            success: false,
            message: "Product Not Found"
        });
    }
};

export const updatedProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Product Not Found"
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Server Error"
        });
    }
};