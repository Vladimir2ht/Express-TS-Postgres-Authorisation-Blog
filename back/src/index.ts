import fs from "fs";
import express from "express";
import cors from "cors";
import postsRouter from './posts/postsRouter'
import authRouter from './auth/authRouter'
import frontRouter from "./frontRouter";

const app = express(),
			host = '192.168.0.100',
			port = 4000;

function resWhenNo(res) {res.status(404).send('Not found')};

app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter);
app.use('/auth', authRouter);
// app.use('/', frontRouter);

app.use('/uploads', async (req, res) => {
	try {
		res.status(200).end(await fs.promises.readFile(req.originalUrl.slice(1)));
	} catch (error) {
		resWhenNo(res);		
	}
});

app.use((req, res) => {resWhenNo(res)});

app.listen(port, host, () => {
	console.log(`Server listens http://${host}:${port}`);
	console.log('Server listens vladimir2ht.ddns.net:' + port);
});
