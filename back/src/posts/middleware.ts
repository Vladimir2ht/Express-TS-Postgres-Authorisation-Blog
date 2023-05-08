import jwt from "jsonwebtoken";
import key from "../tokenKey";
import db from "../db";

export default async function (req, res, next) {
	try {
		console.log(req.headers.authorization);
		
		if (!req.headers.authorization) {
			return res.status(403).json({message: 'Wrong authorization token'});
		}
		// if (!req.headers.authorization.split.split(' ')[1]) {
		// 	return res.status(403).json({message: 'Wrong authorization token'});
		// }
		
		const person = (jwt.verify(req.headers.authorization.split(' ')[1], key) as {name: string, password: string});
		console.log(person);
		

		const dbRequest = await db.query(
			'SELECT name FROM person WHERE name = $1 AND password = $2 LIMIT 1',
			[person.name, person.password]
		);
		
		if (dbRequest.rowCount !== 1) return res.json({message: 'not your token'})
		console.log(req.headers.authorization = person.name);
		next();
	} catch (error) {
		console.log(error);
		return res.status(400).json({message: 'not your token', error});
	}
}