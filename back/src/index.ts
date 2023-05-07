import express from "express";
import cors from "cors";
// import fs from "fs";
// import path from "path";
// import axios from "axios";
import router from './router'

const app = express(),
			host = '192.168.0.100',
			port = 4000,
			ammo_URL = 'https://gacob64819.amocrm.ru/oauth2/access_token'; //Формируем URL для запроса

app.use(cors());
app.use(express.json());

app.use('/auth', router)

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
