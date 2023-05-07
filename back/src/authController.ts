import db from "./db";

class Controller {

	async registration(req, res) {
		try {
			console.log('reg', req.body);
			console.log('reg1', req.params);
			
			if (!req.body.name) return res.json({message: 'where login'});
			
			let dbRequest = await db.query(
				'SELECT name FROM person WHERE name = $1 LIMIT 1',
				[req.body.name]
			);
			console.log(dbRequest);
			
			if (dbRequest.rowCount === 0) {
				console.log(req.body.name, req.body.password);
				
				dbRequest = await db.query(
					'INSERT INTO person (name, password) VALUES ($1, $2)',
					[req.body.name, req.body.password]
				);
			console.log(dbRequest);
			};
			
			res.json({norm: 6})
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}

	}

	async login(req, res) {
		res.json({norm: 5})
	}

}

export default new Controller;
