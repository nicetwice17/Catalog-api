import { AuthController } from "../controller/authController.js";

export class AuthRouter {
  _router;
  constructor(router) {
    this._router = router
  }

  getRoutes() {
    const controller = new AuthController();
      
    this._router.post("/register", controller.register);
      
    this._router.post("/login", controller.login);
    
    return this._router
  }
} 