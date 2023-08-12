import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    discountName: {
        type: String,
        default: null
    },
    discountType: {
        type: String,
        default: null
    },
    productType: {
        type: String,
        default: null
    },
    shopType: {
        type: String,
        default: null
    },
    name: {
        type: String,
        unique: true
    },
    dateFrom: {
        type: String,
        default: null
    },
    dateTo: {
        type: String,
        default: null
    },
    oldPrice: {
        type: Number,
        default: null
    },
    newPrice: {
        type: Number,
        default: null
    },
    createdDate: {
        type: Date,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    poster: {
        type: String,
        default: null
    }
})

export const Product = mongoose.model("products", productSchema)