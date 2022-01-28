"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import connectDatabase from './database/connection';
const routes_1 = __importDefault(require("./routes"));
// import Scripts from './database/scripts/syncData';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = express_1.default();
exports.server = server;
const SERVER_PORT = process.env.PORT || 5000;
server.use(cors_1.default());
server.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Expose-Headers': 'X-Greenlab-App',
    });
    next();
});
server.use(body_parser_1.default.json({ limit: '4mb' }));
server.use(body_parser_1.default.urlencoded({
    limit: '4mb',
    extended: true,
}));
server.use(express_1.default.static('public'));
server.use('/images', express_1.default.static('images'));
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
server.get('/test', (req, res) => {
    res.send("Test OK.");
});
server.use('/api', routes_1.default);
server.listen(SERVER_PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running at ${SERVER_PORT}`);
    // connectDatabase();
}));
//# sourceMappingURL=server.js.map