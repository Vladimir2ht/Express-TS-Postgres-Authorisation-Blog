import fs from "fs";
import db from "../db";

class postsController {

	async get(req, res) {
		try {
			
			const dbRequest = await db.query('SELECT * FROM posts');
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
			res.status(200).end();
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'add post error', error});
		}
	}

	async delete(req, res) {
		try {
			console.log(req.query);
			
			const dbRequest = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [req.query.id]);
			if (!dbRequest.rows[0]) return res.status(206).end('No post');
			if (dbRequest.rows[0].content_type !== 'text') {
				fs.rm(dbRequest.rows[0].body, (err) => console.log(err));
			}
			return res.status(200).end();
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}
	}

	async patch(req, res) {
		try {
			req.body = Object.assign({},req.body);
			let contentType: string = 'text';
			let postTextContent: string = req.body.text;
			const postId: number = req.body.id;
			// console.log(JSON.parse(JSON.stringify(req.body)).text);
			
			if (req.file) {
				contentType = req.file.mimetype;
				postTextContent = req.file.path;
			};

			db.query(
				'UPDATE posts SET body = $1, content_type = $2 WHERE id = $3 AND user_name = $4',
				[postTextContent, contentType, postId, req.headers.authorization]
			);
			
		} catch (error) {
			console.log(error);
			return res.status(400).json({message: 'db error', error});
		}
	}

}

export default new postsController;
