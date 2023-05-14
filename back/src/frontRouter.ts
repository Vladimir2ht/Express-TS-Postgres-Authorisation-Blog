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
	'/js/app.faea46a4.js',
	'/js/chunk-vendors.d1c60567.js',
	'/css/app.fb0f17cf.css',
	'/css/chunk-vendors.2e5e3781.css',
].forEach(doc => router.get(doc, async (req, res) => {
	await fileReader(res, '../front/dist' + doc);
}));

export default router
