import {Router} from "express";
import UserController from "../Controllers/UserController.js";
const userRouter = Router();

userRouter.post('/create_user', UserController.createUser)
userRouter.delete('/delete_user/:userId', UserController.deleteUser)
userRouter.post('/login', UserController.loginUser)
userRouter.put('/update_email/:userId', UserController.updateUserEmail)

export default userRouter;