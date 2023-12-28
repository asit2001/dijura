import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import connectDB from '@/config/DB';
import { IS_TEST, PORT } from '@/config/const';
import router from '@/router/index';
import ServerError from './errors/serverError';
import doc from './doc/doc.json';

connectDB();
export const app = express();
app.use(express.json());
app.use(cors({
	exposedHeaders: ['Cookie',"Authorization"],
	credentials:true,
	origin: 'http://localhost:5173'
  }));
app.use(cookieParser());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(doc,{
	customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css'
}));
app.use('/api/v1', router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof ServerError) {
		return res.status(err.status).json({
			success: false,
			status: 'error',
			title: err.title,
			message: err.message,
		});
	}

	res.status(500).json({
		success: false,
		status: 'error',
		title: 'Internal Server Error',
		message: err.message,
	});
	next();
});
if (!IS_TEST) {
	app.listen(PORT, () => {
		console.log('server running at port ' + PORT);
	});
}
