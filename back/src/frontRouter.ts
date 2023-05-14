import { Router } from "express";
import fs from "fs";

const router = Router();

async function fileReader(res, way: string) {
	res.status(200).end(await fs.promises.readFile(way));
};

router.get('/', async (req, res) => {
	await fileReader(res, '../front/dist/index.html');
});

[
	'/favicon.ico',
	'/js/app.8b38db7e.js',
	'/js/chunk-vendors.7039a6a3.js',
	'/css/app.16a5b42b.css',
	'/css/chunk-vendors.2e5e3781.css',
].forEach(doc => router.get(doc, async (req, res) => {
	await fileReader(res, '../front/dist' + doc);
}));

export default router
