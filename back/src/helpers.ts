export function errorFunction(res, error: Error, message: string = 'db error') {
	console.log(error);
	return res.status(400).json({message: message, error});
}