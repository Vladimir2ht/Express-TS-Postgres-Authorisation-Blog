import { Router } from "express";
import authController from "./authController";

const router = Router();

router.post('/reg', authController.registration);
router.post('/log', authController.login);

export default router
