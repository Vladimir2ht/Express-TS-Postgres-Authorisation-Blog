import express from "express";
import cors from "cors";
// import fs from "fs";
// import path from "path";
import postsRouter from './posts/postsRouter'
import authRouter from './auth/authRouter'

const app = express(),
			host = '192.168.0.100',
			port = 4000;

app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {

	console.log('+')

	res.status(200).send('absd');
});

app.use((req, res, next) => {
	res.status(404).type('text/plain')
	res.send('Not found')
})

app.listen(port, host, () => {
	console.log(`Server listens http://${host}:${port}`)
	console.log('Server listens vladimir2ht.ddns.net:4000')
})
