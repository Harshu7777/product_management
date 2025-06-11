const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")

exports.addProduct = asyncHandler(async(req,res) => {
    const {product_id , name , price , company} = req.body;

    if(!product_id || !name || !price || !company){
        res.status(400).json({message: "All field is required...!"})
    }

    const productExists = await Product.findOne({ product_id })

    if(productExists){
        return res.status(400).json({message: "Product already exists...!"})
    }

    const product = await Product.create({
        product_id,
        name,
        price,
        company
    })

    if(!product){
        return res.status(400).json({message: "Product not created...!"})
    }

    res.status(201).json({
        message : "Product create SuccessFully",
        _id: product._id,
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        company: product.company
    })
})

exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (products.length === 0) {
        return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json({
        message: "All products fetched successfully.",
        products
    });
});

exports.updateProductById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const product = await Product.findById(id);
    if (!product){
        return res.status(404).json({ message: "Product not found...!" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },  
        { new: true }        
    );

    if (!updatedProduct) {
        return res.status(400).json({ message: "Product not updated." });
    }

    res.status(200).json({
        message: "Product updated successfully.",
        product: updatedProduct
    });
});

exports.deleteProductById = asyncHandler(async(req,res) => {
    const {id} = req.params;

    const product = await Product.findById(id);

    if(!product){
        return res.status(404).json({message: "Product not found...!"})
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if(!deletedProduct){
        return res.status(400).json({message: "Product not deleted...!"})
    }

    res.status(200).json({
        message: "Product deleted successfully.",
        product: deletedProduct
    })
})

exports.getProductsLowerThan = asyncHandler(async (req, res) => {
    const priceLimit = parseFloat(req.params.value);

    const products = await Product.find({ price: { $lt: priceLimit } });

    if (products.length === 0) {
        return res.status(404).json({ message: "No products found below this price." });
    }

    res.status(200).json({
        message: `Products with price less than ${priceLimit}`,
        products
    });
});

exports.getProductsHigherThan = asyncHandler(async (req, res) => {
    const priceLimit = parseFloat(req.params.value);

    const products = await Product.find({ price: { $gt: priceLimit } });

    if (products.length === 0) {
        return res.status(404).json({ message: "No products found above this price." });
    }

    res.status(200).json({
        message: `Products with price greater than ${priceLimit}`,
        products
    });
});