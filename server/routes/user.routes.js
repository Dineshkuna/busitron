import express from 'express';
import { allusers, createNewUser, deleteUserProfile, login, updateUserProfile, singleUser } from '../controllers/auth.controller.js';
import { roleRoute, userauth } from '../auth/tokenverifying.auth.js';

const route = express.Router();



route.post('/createnewuser', createNewUser);
route.post('/login', login);
route.put('/update/:id', updateUserProfile);
route.delete('/delete/:id',userauth, roleRoute(["admin"]), deleteUserProfile);
route.get('/allusers', userauth, roleRoute(["admin"]), allusers);
route.get('/user/:id',userauth,roleRoute(["admin"]), singleUser)




export default route;