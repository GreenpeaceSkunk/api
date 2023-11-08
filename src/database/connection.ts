// import mongoose = require('mongoose');
// import { MongoClient } from 'mongodb'

export default module.exports = async () => {
  // const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
  // const client = new MongoClient(url);

  // // Database Name
  // const dbName = `${process.env.DB_NAME}`;

  // async function main() {
  //   console.log('Connect to Moongose', dbName)

  //   // Use connect method to connect to the server
  //   await client.connect();
  //   console.log('Connected successfully to server');
  //   const db = client.db(dbName);
  //   // const collection = db.collection('documents');
  
  //   // the following code examples can be pasted here...
  
  //   return 'done.';
  // }

  // main()
  //   .then((result: any) => {
  //     console.log(result)
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  //   .finally(() => client.close());
};
// export default module.exports = async () => {
//   console.log(`Connecting to database ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
//   try {
//     const db = await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
//       // useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true
//     });

//     db.connection.on('error', (error: any) => {
//       console.log("Error", error);
//     });

//     db.connection.once('open', (error: any) => {
//       console.log('Database connected');
//     });

//   } catch(error) {
//     console.log(error);
//   }
// }


