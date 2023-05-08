import { Router } from "express";
import fs from "fs";

const router = Router();

router.get('/', (req, res) => {
	const file = fs.readFileSync('../front/dist/index.html',);
	res.status(200).end(file);
});
router.get('/js/app.17e94889.js', (req, res) => {
	const file = fs.readFileSync('../front/dist/js/app.17e94889.js',);
	res.status(200).end(file);
});
router.get('/js/chunk-vendors.bd56fda9.js', (req, res) => {
	const file = fs.readFileSync('../front/dist/js/chunk-vendors.bd56fda9.js',);
	res.status(200).end(file);
});
router.get('/css/app.b1daaac1.css', (req, res) => {
	const file = fs.readFileSync('../front/dist/css/app.b1daaac1.css',);
	res.status(200).end(file);
});
router.get('/css/chunk-vendors.2e5e3781.css', (req, res) => {
	const file = fs.readFileSync('../front/dist/css/chunk-vendors.2e5e3781.css',);
	res.status(200).end(file);
});

export default router
