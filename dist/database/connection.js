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
exports.default = module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    // const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=true`
    const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority&ssl=false`;
    console.log(`Connecting to database ${URI}`);
    // DB_USERNAME=danto
    // DB_PASSWORD=danto
    // DB_HOST=localhost
    // DB_PORT=27019
    // DB_NAME=greenpeace_adn
    // SECRET_KEY=Gr33np34ce
    // const mongoose = require('mongoose')
    try {
        // const db = await mongoose.connect(`${URI}`, {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        //   useFindAndModify: false,
        //   useCreateIndex: true
        // });
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
        // db.connection.on('error', (error: any) => {
        //   console.log("Error", error);
        // });
        // db.connection.once('open', (error: any) => {
        //   console.log('Database connected');
        // });
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=connection.js.map