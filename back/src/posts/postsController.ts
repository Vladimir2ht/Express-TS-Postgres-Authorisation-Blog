import fs from "fs";
import db from "../db";

class postsController {

	async get(req, res) {
		try {
			
			const dbRequest = await db.query('SELECT user_name, date_created, body FROM posts');
			console.log(dbRequest.rows);
			res.json(dbRequest.rows);
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}

	}

	async add(req, res) {
		try {
			let contentType: string = 'text';
			let postTextContent: string = Object.assign({},req.body).text;
			// console.log(JSON.parse(JSON.stringify(req.body)).text);
			
			if (req.file) {
				contentType = req.file.mimetype;
				postTextContent = req.file.path;
			};

			db.query(
				'INSERT INTO posts (user_name, date_created, body, content_type) VALUES ($1, $2, $3, $4)',
				[req.headers.authorization, new Date(), postTextContent, contentType]
			);
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'add post error', error});
		}
	}

	async delete(req, res) {
		try {
			console.log(req.query);
			
			const dbRequest = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [req.query.id]);
			if (dbRequest.rows[0].content_type !== 'TEXT') {
				fs.rm(dbRequest.rows[0].body, (err) => console.log(err))
			}
			
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
