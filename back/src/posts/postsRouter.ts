import { Router } from "express";
import postsController from "../posts/postsController";
import middleware from "../middleware";

const router = Router();

router.get('/', postsController.get);
router.put('/', middleware, postsController.add);
router.delete('/', middleware, postsController.delete);
router.patch('/', middleware, postsController.patch);

export default router
