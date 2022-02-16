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
Object.defineProperty(exports, "__esModule", { value: true });
// module.exports = {
//   connectDatabase: async () => {
//     console.log(`Connecting to database ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
//     try {
//       const db = await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//       });
//       db.connection.on('error', (error: any) => {
//         console.log("Error", error);
//       });
//       db.connection.once('open', (error: any) => {
//         console.log('Database connected');
//       });
//     } catch(error) {
//       console.log(error);
//     }
//   }
// }
exports.default = module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Connecting to database ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    // try {
    //   const db = await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    //     useCreateIndex: true
    //   });
    //   db.connection.on('error', (error: any) => {
    //     console.log("Error", error);
    //   });
    //   db.connection.once('open', (error: any) => {
    //     console.log('Database connected');
    //   });
    // } catch(error) {
    //   console.log(error);
    // }
});
//# sourceMappingURL=connection.js.map