import mongoose from "mongoose";


const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: Date,
  pages: Number,
  genre: String
});

const Book= mongoose.model('Book', BookSchema);

export default Book
