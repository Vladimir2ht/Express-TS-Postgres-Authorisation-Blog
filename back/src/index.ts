import express from "express";
import cors from "cors";
import postsRouter from './posts/postsRouter'
import authRouter from './auth/authRouter'
import frontRouter from "./frontRouter";

const app = express(),
			host = '192.168.0.100',
			port = 4000;

app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter)
app.use('/auth', authRouter)
app.use('/', frontRouter)

app.use((req, res) => {
	res.status(404).type('text/plain')
	res.send('Not found')
})

app.listen(port, host, () => {
	console.log(`Server listens http://${host}:${port}`)
	console.log('Server listens vladimir2ht.ddns.net:4000')
})
