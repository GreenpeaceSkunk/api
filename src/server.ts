import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// import connectDatabase from './database/connection';
import apiRoutes from './routes';
// import Scripts from './database/scripts/syncData';

import dotenv from 'dotenv';
dotenv.config();

const server: express.Application = express();
const SERVER_PORT = process.env.PORT || 5000;

server.use(cors());
server.use((req: Request, res: Response, next: NextFunction) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Expose-Headers': 'X-Greenlab-App',
  });
  next();
});
server.use(bodyParser.json({limit: '4mb'}));
server.use(bodyParser.urlencoded({
  limit: '4mb',
  extended: true,
}));

server.use(express.static('public')); 
server.use('/images', express.static('images'));

// server.use(session({
//   secret: process.env.SECRET_KEY,
//   signed: false,
// }));

// const schema = buildSchema(`
//   type User {
//     _id: String
//     firstName: String
//     lastName: String
//     email: String
//     role: String
//   }

//   type Query {
//     userById(_id: String!): User
//     userByEmail(email: String!): User
//     users: [User]
//   }
// `);

// const rootValue = {
//   userById: getUserById,
//   userByEmail: getUserByEmail,
//   users: getUsers
// }

// server.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue,
//   graphiql: true,
// }));

server.get('/test', (req: Request, res: Response) => {
  res.send("Test OK.");
});

server.use('/api', apiRoutes);

server.listen(SERVER_PORT, async () => {
  console.log(`Server running at ${SERVER_PORT}`);
  // connectDatabase();
});

export {
  server,
};
