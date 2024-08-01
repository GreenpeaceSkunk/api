import mongoose, {ConnectOptions} from 'mongoose';
mongoose.set('strictQuery', false);

export default module.exports = async () => {
  const URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  
  try { 
    mongoose.connection
      .on('connecting', function(){
        console.log('Connecting to database')
      })
      .on('open', err => {
        console.log(`Connected to database`);
      })
    await mongoose.connect(URI, {} as ConnectOptions);
  } catch (error: any) {
    console.log('db error', error);
    throw new Error(error);
  }
}
