import fs from "fs";
import express, { Response, Request } from "express";
import cors from "cors";
import postsRouter from './posts/postsRouter'
import authRouter from './auth/authRouter'
import frontRouter from "./frontRouter";

// express config
const app = express(),
	host = 'localhost',
	port = 4000;

function resWhenNo(res: Response) { res.status(404).send('Not found') };


// app.use(cors({origin: ["localhost:4000", "localhost:8080"]})); // Отключение cors нужно только в тесовом режиме.
// app.use(cors()); // Отключение cors нужно только в тесовом режиме.
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

app.use((req: Request, res: Response) => { resWhenNo(res) }); // Нет страницы.

app.all('/', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

// Запуск сервера в логах пишет по какому аддресу обращаться.
app.listen(port, host, () => {
	console.log(`Server listens http://${host}:${port}`);
	// console.log('Server listens vladimir2ht.ddns.net:' + port);
});