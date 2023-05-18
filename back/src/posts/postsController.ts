import { Request, Response } from "express";
import fs from "fs";
import { QueryResult } from "pg";
import db from "../db";
import { errorFunction } from "../helpers";
import { 
	ConfirmAuthRequest,
	ErrorMessageObject,
	RequestBodyTextID,
	RequestQueryIDWithAuth
} from "../types";

function removeFile(dbRequest: QueryResult, res: Response) {
	if (!dbRequest.rows[0]) return res.status(206).end('No post');
	if (dbRequest.rows[0].content_type !== 'text') {
		fs.rm(dbRequest.rows[0].body, (err) => console.log(err));
	}
	 goodAnswer(res);
};

function goodAnswer(res: Response) {res.status(200).end()};

function parseIfFile(req: RequestBodyTextID): [string, string, number] {
	req.body = Object.assign({}, req.body);
	let contentType: string = 'text';
	let postTextContent: string = req.body.text;
	console.log(req.body);
	
	if (req.file) {
		contentType = req.file.mimetype;
		postTextContent = req.file.path;
	};
	return [contentType, postTextContent, req.body.id]
};


class postsController {

	async get(req: Request, res: Response<ErrorMessageObject | any[]> ) {
		try {
			const dbRequest = await db.query('SELECT * FROM posts');
			res.json(dbRequest.rows);
		} catch (error) {
			errorFunction(res, error);
		}
	}

	async add(req: ConfirmAuthRequest, res: Response) {
		try {
			console.log('add');

			const [contentType, postTextContent] = parseIfFile(req);

			db.query(
				'INSERT INTO posts (user_name, date_created, body, content_type) VALUES ($1, $2, $3, $4)',
				[req.headers.authorization, new Date(), postTextContent, contentType]
			);

			goodAnswer(res);
		} catch (error) {
			return errorFunction(res, error, 'add post error');
		}
	}

	async delete(req: RequestQueryIDWithAuth, res: Response) {
		try {
			console.log(req.query);
			
			const dbRequest = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [req.query.id]);
			removeFile(dbRequest, res);
			
		} catch (error) {
			return errorFunction(res, error);
		}
	}

	async patch(req: ConfirmAuthRequest, res: Response) {
		try {
			const [contentType, postTextContent, postId] = parseIfFile(req);

			const dbRequest = await db.query(
				`UPDATE posts x SET body = $1, content_type = $2
					FROM posts y WHERE x.id = $3 AND x.id = y.id AND x.user_name = $4
					RETURNING y.content_type, y.body`,
				[postTextContent, contentType, postId, req.headers.authorization]
			);
			console.log(dbRequest);
			removeFile(dbRequest, res);

		} catch (error) {
			return errorFunction(res, error);
		}
	}

}

export default new postsController;
