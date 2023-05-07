import db from "../db";

class postsController {

	async get(req, res) {
		try {
			
			const dbRequest = await db.query('SELECT user_name, date_created, body FROM posts');
			console.log(dbRequest);
			res.json(dbRequest.rows);
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}

	}

	async add(req, res) {
		try {

			// db.query('INSERT INTO posts (name, password) VALUES ($1, $2)', )
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}
	}

	async delete(req, res) {
		try {

			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}
	}

	async patch(req, res) {
		try {

			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}
	}

}

export default new postsController;
