import mongoose from "mongoose";
import express from 'express'
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js'
import bookRouter from './routes/book.route.js'
import userRouter from './routes/user.route.js'
import cors from "cors"
import dotenv from 'dotenv';
import Book from "./models/book.model.js";

const app = express();
app.use(cors())
const port = 4000;

mongoose.connect('mongodb+srv://abhishek:abhishek@bookshelf.lb9mkcb.mongodb.net/BookShelf')
.then(()=>
{console.log('connected to mongodb');})
.catch((err)=>{console.log(err);});

app.use(express.json());


app.use(cookieParser())

dotenv.config()


app.use('/api/auth',authRouter);
app.use('/api/book',bookRouter);
app.use('/api/user',userRouter);




app.post('/api/book/:id/review', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    book.reviews.push(req.body.review);
    await book.save();
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
