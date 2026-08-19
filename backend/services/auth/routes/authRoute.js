import express from 'express';
import { GoogleAuth, logOut, useCoins } from '../controllers/authController.js';

const authRouter = express.Router()

authRouter.post('/login',GoogleAuth)

authRouter.get('/logout', logOut)

authRouter.post('/use-coins', useCoins)

export default authRouter