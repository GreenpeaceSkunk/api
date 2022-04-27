import { Request, Response } from 'express';
import app from './app';
import apiRoutes from './routes';

// import connectDatabase from './database/connection';
// import Scripts from './database/scripts/syncData';

import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.PORT || 5001;

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

app.get('/api-status', (req: Request, res: Response) => {
  res.send("OK.");
});

app.use(`/api`, apiRoutes);
app.listen(SERVER_PORT, async () => {
  console.log(`Server running on port ${SERVER_PORT}`);
  // connectDatabase();
});
