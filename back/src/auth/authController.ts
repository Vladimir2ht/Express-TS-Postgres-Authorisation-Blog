import { Response } from "express";
import db from "../db";
import jwt from "jsonwebtoken";
import key from "../tokenKey";
import { errorFunction } from "../helpers";
import { RequestWithAuth } from "../types";

function generateAccessToken(name: string, password: string, res: Response<{token: string}>): void {
	res.json({token: jwt.sign({name, password}, key)});
};

function wrongAuth(res: Response<{message: string}>) {
	res.status(205).json({message: 'Wrong user or password'})
};

function whereLogin(res: Response<{message: string}>) {
	res.json({message: 'where login'})
};

function haveEmpty(name: string, password: string): boolean {return !(name && password)};

class authController {

	async registration(req: RequestWithAuth, res: Response) {
		try {
			console.log('reg');
			const name = req.body.name;
			const password = req.body.password;
			if (haveEmpty(name, password)) return whereLogin(res);
			
			let dbRequest = await db.query(
				'SELECT name FROM person WHERE name = $1 LIMIT 1',
				[name]
			);
			
			if (dbRequest.rowCount === 0) {
				dbRequest = await db.query(
					'INSERT INTO person (name, password) VALUES ($1, $2)',
					[name, password]
				);
				console.log(dbRequest);
				generateAccessToken(name, password, res);
			} else wrongAuth(res);
			
			
		} catch (error) {
			errorFunction(res, error);
		}

	}

	async login(req: RequestWithAuth, res: Response) {
		try {
			const name = req.body.name;
			const password = req.body.password;
			if (haveEmpty(name, password)) return whereLogin(res);
			
			const dbRequest = await db.query(
				'SELECT name FROM person WHERE name = $1 AND password = $2 LIMIT 1',
				[name, password]
			);
			
			if (dbRequest.rowCount === 1) generateAccessToken(name, password, res)
			else wrongAuth(res);

		} catch (error) {
			errorFunction(res, error);
		}
	}

}

export default new authController;
