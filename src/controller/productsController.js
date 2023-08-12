import { Product } from "../model/product.js";

export class ProductsController {
    constructor() {}

    async createProduct(req, res) {
        const { 
            discountName,
            discountType,
            productType,
            shopType,
            name,
            dateFrom,
            dateTo,
            oldPrice,
            newPrice,
            createdAt,
            discount 
        } = req.body;
      
      try {
        // Validate product input
        if (!(
            discountName &&
            discountType &&
            productType &&
            shopType &&
            name &&
            dateFrom &&
            dateTo &&
            oldPrice &&
            newPrice &&
            discount
            )) {
          res.status(400).send("All input is required");
        }

        // Validate if product with same name exist in our database
        const existProduct = await Product.findOne({ name });

        if (existProduct) {
          return res.status(409).send("Product with same name, Already Exist. Please rename product");
        }
       
     
        // Create product in our database
        const product = await Product.create({ 
            ...req.body,
            createdAt: !createdAt ? new Date() : createdAt
         });

        // return new product
        res.status(201).json(product);


      } catch(err) {
        console.log(err);
        res.status(400).json('Can not create product')
      }
    }

    async getProducts(req, res) {
       const { page, limit } = req.query;
       try {
        const products = await Product.find({  })
        // We multiply the "limit" variables by one just to make sure we pass a number and not a string
        .limit(limit * 1)
        // I don't think i need to explain the math here
        .skip((page - 1) * limit)
        // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
        .sort({ createdAt: -1 })
         
        res.status(201).json(products);
       } catch (err) {
        console.log(err);
        res.status(400).json('Products Not found')
       }
    }

}