import fs from "fs";
import express,  { Response, Request } from "express";
import cors from "cors";
import postsRouter from './posts/postsRouter'
import authRouter from './auth/authRouter'
import frontRouter from "./frontRouter";

// express config
const app = express(),
			host = '192.168.0.100',
			port = 4000;

function resWhenNo(res: Response) {res.status(404).send('Not found')};

app.use(cors()); // Отключение cors нужно только в тесовом режиме.
app.use(express.json());

// Подключение роутеров.
app.use('/posts', postsRouter);
app.use('/auth', authRouter);
// app.use('/', frontRouter);

// Роутер отправляющий файлы.
app.use('/uploads', async (req: Request, res: Response) => {
	try {
		res.status(200).end(await fs.promises.readFile(req.originalUrl.slice(1)));
	} catch (error) {
		resWhenNo(res); // Нет файла.
	}
});

app.use((req: Request, res: Response) => {resWhenNo(res)}); // Нет страницы.

// Запуск сервера в логах пишет по какому аддресу обращаться.
app.listen(port, host, () => {
	console.log(`Server listens http://${host}:${port}`);
	console.log('Server listens vladimir2ht.ddns.net:' + port);
});
