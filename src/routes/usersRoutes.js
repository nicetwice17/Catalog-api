import { UsersController } from "../controller/usersController.js";

export class UsersRouter {
  _router;
  constructor(router) {
    this._router = router
  }

  getRoutes() {
    const controller = new UsersController();
      
    this._router.get("/list", controller.getUsers);
      
    this._router.get("/user/:id", controller.getUser);
    
    return this._router
  }
} 