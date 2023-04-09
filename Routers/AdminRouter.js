import {Router} from "express";
import AdminController from "../Controllers/AdminController.js";
const AdminRouter = Router();

AdminRouter.post('/login', AdminController.loginAdmin);
AdminRouter.post('/add_admin', AdminController.createAdmin);


export default AdminRouter;