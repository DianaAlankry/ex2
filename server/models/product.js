const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    _id: String,

    title: {
        type: String,
        require: true
    },
    amount: {
        type: String,
        require: true,
    },
    /*    category: {
            type: String,
            lowercase: true,
            enum: ['fruit', 'vegetable', 'dairy']
        }*/
})

const Product = mongoose.model('products', productSchema);
module.exports = Product;
