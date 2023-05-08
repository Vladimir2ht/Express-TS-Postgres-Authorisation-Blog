import { Router } from "express";
import fs from "fs";

const router = Router();

router.get('/', async (req, res) => {
	const file = await fs.promises.readFile('../front/dist/index.html',);
	res.status(200).end(file);
});
router.get('/js/app.17e94889.js', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/js/app.17e94889.js'));
});
router.get('/js/chunk-vendors.bd56fda9.js', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/js/chunk-vendors.bd56fda9.js'));
});
router.get('/css/app.b1daaac1.css', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/css/app.b1daaac1.css'));
});
router.get('/css/chunk-vendors.2e5e3781.css', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/css/chunk-vendors.2e5e3781.css'));
});

export default router
