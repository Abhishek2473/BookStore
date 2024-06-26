import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from  '../models/user.model.js'


// user profile operations

export const updateUser = async (req, res, next) => {

    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };


  export const deleteUser = async (req, res, next) => {

    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };



  export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };




//user book operations

export const createReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookIds } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.readingList = bookIds;
    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addBookToReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    if (!user.readingList.includes(bookId)) {
      user.readingList.push(bookId);
      await user.save();
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const removeBookFromReadingList = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.readingList = user.readingList.filter(id => id.toString() !== bookId);
    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const getReadingList = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId).populate('readingList');
      if (!user) return res.status(404).send('User not found');
  
      res.status(200).send(user.readingList);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };