import UserController from '../controllers/userController_.js' 
import express from 'express';
const UsersRouter = express.Router();

UsersRouter.post('/users/signUp',UserController.signUpCtrl);

UsersRouter.post('/users/login',UserController.loginCtrl);

UsersRouter.delete('/users/deleteAccount',UserController.deleteAccountCtrl);


export default UsersRouter;