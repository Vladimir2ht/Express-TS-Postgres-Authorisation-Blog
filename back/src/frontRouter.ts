import { Router } from "express";
import fs from "fs";

const router = Router();

router.get('/', async (req, res) => {
	const file = await fs.promises.readFile('../front/dist/index.html',);
	res.status(200).end(file);
});
router.get('/js/app.0a44d1a8.js', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/js/app.0a44d1a8.js'));
});
router.get('/js/chunk-vendors.98d113c8.js', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/js/chunk-vendors.98d113c8.js'));
});
router.get('/css/app.45ff5f63.css', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/css/app.45ff5f63.css'));
});
router.get('/css/chunk-vendors.2e5e3781.css', async (req, res) => {
	res.status(200).end(await fs.promises.readFile('../front/dist/css/chunk-vendors.2e5e3781.css'));
});

export default router
