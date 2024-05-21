import Book from "../models/book.model.js";

export const createBook = async (req, res) => {
  const { title, author, publishedDate, pages, genre } = req.body;

  try {
    const newBook = new Book({ title, author, publishedDate, pages, genre });
    await newBook.save();

    res.status(201).send(newBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
