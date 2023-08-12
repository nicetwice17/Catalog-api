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
            createdDate,
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
            createdDate: !createdDate ? new Date() : createdDate
         });

        // return new product
        res.status(201).json(product);


      } catch(err) {
        console.log(err);
        res.status(400).json('Can not create product')
      }
    }
}