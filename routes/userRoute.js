import UserController from '../controllers/userController_.js' 
import express from 'express';
const UsersRouter = express.Router();

UsersRouter.post('/users/sign-up',UserController.signUpCtrl);

UsersRouter.post('/users/login',UserController.loginCtrl);

UsersRouter.delete('/users/delete-account',UserController.deleteAccountCtrl);


export default UsersRouter;
