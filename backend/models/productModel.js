const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true    
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    company: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
