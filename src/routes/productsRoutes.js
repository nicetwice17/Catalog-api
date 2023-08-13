import { ProductsController } from "../controller/productsController.js";
import { verifyJwtToken } from "../middleWares/auth.js";

export class ProductsRouter {
  _router;
  constructor(router) {
    this._router = router
  }

  getRoutes() {
    const controller = new ProductsController();
    
    this._router.post("/list", verifyJwtToken, controller.getProducts);

    this._router.get("/product", verifyJwtToken, controller.getProduct);
    
    this._router.post("/create", verifyJwtToken, controller.createProduct);

    this._router.put("/update", verifyJwtToken, controller.updateProduct);
    
    return this._router
  }
} 