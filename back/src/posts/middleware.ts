import { Response } from "express";
import jwt from "jsonwebtoken";
import key from "../tokenKey";
import db from "../db";
import { errorFunction } from "../helpers";
import { ConfirmAuthRequest, AuthObject } from "../types";

export default async function (req: ConfirmAuthRequest, res: Response<{message: string}>, next: () => void) {
	try {
		console.log(req.headers.authorization);
		
		if (!req.headers.authorization) {
			return res.status(403).json({message: 'No authorization token'});
		}
		
		const person = (jwt.verify(req.headers.authorization.split(' ')[1], key) as AuthObject);
		console.log(person);
		

		const dbRequest = await db.query(
			'SELECT name FROM person WHERE name = $1 AND password = $2 LIMIT 1',
			[person.name, person.password]
		);
		
		if (dbRequest.rowCount !== 1) return res.json({message: 'Wrong authorization token'})
		console.log(req.headers.authorization = person.name);
		next();
	} catch (error) {
		return errorFunction(res, error, 'Error with authorization');
	}
}