import { Router } from "express";
import fs from "fs";

const router = Router();

async function fileReader(res, way: string) {
	res.status(200).end(await fs.promises.readFile(way));
};

router.get('/', async (req, res) => {
	await fileReader(res, '../front/dist/index.html');
});
router.get('/js/app.8b38db7e.js', async (req, res) => {
	await fileReader(res, '../front/dist/js/app.8b38db7e.js');
});
router.get('/js/chunk-vendors.7039a6a3.js', async (req, res) => {
	await fileReader(res, '../front/dist/js/chunk-vendors.7039a6a3.js');
});
router.get('/css/app.16a5b42b.css', async (req, res) => {
	await fileReader(res, '../front/dist/css/app.16a5b42b.css');
});
router.get('/css/chunk-vendors.2e5e3781.css', async (req, res) => {
	await fileReader(res, '../front/dist/css/chunk-vendors.2e5e3781.css');
});

export default router
