import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';

import ordersRoutes from './routes/orders-route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(json());

app.use('/orders', ordersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({message:'Simple Express Server'});
});

app.use((err: Error, req: Request, res:Response, next: NextFunction) => {
  res.status(500).json({message: err.message});
});

app.listen(port, () => {
  console.log(`[server]: Server started at http://localhost:${port}`);
});