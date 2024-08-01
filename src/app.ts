import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import connectDatabase from './database/connection';

const app: express.Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Expose-Headers': 'X-Greenlab-App',
  });
  next();
});
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({
  limit: '4mb',
  extended: true,
}));

app.use(express.static('public')); 
app.use('/images', express.static('images'));

connectDatabase();

export default app;
