const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        // Check if the user does not already exist
        if (isValid(username)) {
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user, username and \/or password is missingr "});
 });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const fetchBooks = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(books)
    }, 1000)
  });
  fetchBooks.then((books) => {
      return res.status(200).send(JSON.stringify(books, null, 4));
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const requiredBook = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(books[isbn])
    }, 1000)
  })
  requiredBook.then((book) => {
    if(book) {
        return res.status(200).send(JSON.stringify(book, null, 4)); 
    }else {
        return res.status(404).send(`Book with ISBN ${isbn} Not found`)
    }
  })
});
 
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksValues = Object.values(books);
  const requestedBook = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(booksValues.filter(book => book.author === author))
    }, 1000)
  });
  requestedBook.then((book) => {
      if(book.length > 0) {
        return res.status(200).send(JSON.stringify(book, null, 4))
      }else{
        return res.status(404).send(`No books for the author ${author}`)
      }
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksValues = Object.values(books);
  const requestedBook = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(booksValues.filter(book => book.title === title))
    }, 1000)
  });
  requestedBook.then((book) => {
      if(book.length > 0) {
        return res.status(200).send(JSON.stringify(book, null, 4))
      }else{
        return res.status(404).send(`No books for the title ${titl}`)
      }
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const requestedBook = books[isbn]
    if(requestedBook) {
        return res.status(200).send(JSON.stringify({reviews: requestedBook.reviews}, null, 4))
    }else {
        return res.status(404).send(`Book with ISBN ${isbn} Not Found`)
    }
});

module.exports.general = public_users;
