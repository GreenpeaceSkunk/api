"use strict";
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
exports.default = module.exports = async () => {
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
};
//# sourceMappingURL=connection.js.map