import { Router } from "express";
import controller from "./authController";

const router = Router();

router.post('/reg', controller.registration);
router.post('/log', controller.login);

export default router