import { Router } from "express";
import postsController from "../posts/postsController";
import middleware from "./middleware";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {cb(null, './uploads/')},
  filename: function (req, file, cb) {
    cb(null, 
			req.headers.authorization + ';' + 
			new Date().getTime() + ';' +
			Math.round(Math.random() * 1E9)
		);
  }
});
// Прописать ограничения.
const upload = multer({storage});
// const upload = multer({dest: './uploads/'});
const router = Router();

router.get('/', postsController.get);
router.put('/', middleware, upload.single('file'), postsController.add);
router.delete('/', middleware, postsController.delete);
router.patch('/', middleware, upload.single('file'), postsController.patch);

export default router
