import db from "../db";
import jwt from "jsonwebtoken";
import key from "../tokenKey";

function generateAccessToken(name: string, password: string): string {
	return jwt.sign({name, password}, key);
}

class authController {

	async registration(req, res) {
		try {
			
			if (!(req.body.name && req.body.password)) return res.json({message: 'where login?'});
			
			let dbRequest = await db.query(
				'SELECT name FROM person WHERE name = $1 LIMIT 1',
				[req.body.name]
			);
			
			if (dbRequest.rowCount === 0) {
				console.log(req.body.name, req.body.password);
				
				dbRequest = await db.query(
					'INSERT INTO person (name, password) VALUES ($1, $2)',
					[req.body.name, req.body.password]
				);
				console.log(dbRequest);
				res.json({token: generateAccessToken(req.body.name, req.body.password)})
			} else return res.status(205).json({message: 'Wrong user or password'});
			
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}

	}

	async login(req, res) {
		try {
			if (!(req.body.name && req.body.password)) return res.json({message: 'where login'});
			
			const dbRequest = await db.query(
				'SELECT name FROM person WHERE name = $1 AND password = $2 LIMIT 1',
				[req.body.name, req.body.password]
			);
			
			if (dbRequest.rowCount === 1) res.json({
				token: generateAccessToken(req.body.name, req.body.password)
			})
			else return res.status(205).json({message: 'Wrong user or password'});

		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}
	}

}

export default new authController;
