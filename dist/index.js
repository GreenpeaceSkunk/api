"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const routes_1 = __importDefault(require("./routes"));
// import connectDatabase from './database/connection';
// import Scripts from './database/scripts/syncData';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_PORT = process.env.PORT || 5000;
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
app_1.default.get('/test', (req, res) => {
    res.send("OK");
});
app_1.default.use('/api', routes_1.default);
app_1.default.listen(SERVER_PORT, async () => {
    console.log(`Server running on port ${SERVER_PORT}`);
    // connectDatabase();
});
//# sourceMappingURL=index.js.map