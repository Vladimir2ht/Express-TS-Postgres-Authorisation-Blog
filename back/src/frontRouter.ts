import { Router } from "express";
import fs from "fs";

const router = Router();

async function fileReader(res, way: string) {
	res.status(200).end(await fs.promises.readFile(way));
};

router.get('/', async (req, res) => {
	await fileReader(res, '../front/dist/index.html');
});
router.get('/js/app.17e94889.js', async (req, res) => {
	await fileReader(res, '../front/dist/js/app.17e94889.js');
});
router.get('/js/chunk-vendors.bd56fda9.js', async (req, res) => {
	await fileReader(res, '../front/dist/js/chunk-vendors.bd56fda9.js');
});
router.get('/css/app.b1daaac1.css', async (req, res) => {
	await fileReader(res, '../front/dist/css/app.b1daaac1.css');
});
router.get('/css/chunk-vendors.2e5e3781.css', async (req, res) => {
	await fileReader(res, '../front/dist/css/chunk-vendors.2e5e3781.css');
});

export default router
