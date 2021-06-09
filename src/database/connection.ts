import mongoose = require('mongoose');

export default module.exports = async () => {
  // const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=true`
  const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=false`
  console.log(`Connecting to database ${URI}`);

  // DB_USERNAME=danto
  // DB_PASSWORD=danto
  // DB_HOST=localhost
  // DB_PORT=27019
  // DB_NAME=greenpeace_adn
  // SECRET_KEY=Gr33np34ce
  // const mongoose = require('mongoose')


  
  try {
    const db = await mongoose.connect(`${URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    // const noteSchema = new mongoose.Schema({
    //   content: String,
    //   date: Date,
    //   important: Boolean,
    // });
    
    // const Note = mongoose.model('Note', noteSchema)
    
    // const note = new Note({
    //   content: 'HTML is Easy',
    //   date: new Date(),
    //   important: true,
    // });
    
    // note.save().then((result: any) => {
    //   console.log('note saved!')
    //   mongoose.connection.close()
    // });

    db.connection.on('error', (error: any) => {
      console.log("Error", error);
    });

    db.connection.once('open', (error: any) => {
      console.log('Database connected');
    });

  } catch(error) {
    console.log(error);
  }

}
