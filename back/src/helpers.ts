import { Response } from "express";
import { ErrorMessageObject } from "./types";

export function errorFunction(
	res: Response<ErrorMessageObject>,
	error: Error,
	message: string = 'db error'
) {
	console.log(error);
	return res.status(400).json({message, error});
}