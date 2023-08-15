import { UsersController } from "../controller/usersController.js";
import { verifyJwtToken } from "../middleWares/auth.js";

export class UsersRouter {
  _router;
  constructor(router) {
    this._router = router
  }

  getRoutes() {
    const controller = new UsersController();
      
    this._router.get("/list", verifyJwtToken, controller.getUsers);
      
    this._router.get("/user/:id", verifyJwtToken, controller.getUser);

    this._router.put("/user/update/:id", verifyJwtToken, controller.updateUser);

    this._router.delete("/user/delete/:id", verifyJwtToken, controller.deleteUser)
    
    return this._router
  }
} 