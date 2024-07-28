const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    let myPromise = new Promise((resolve,reject) => {
        resolve(JSON.stringify(books,null,4))
        })

    myPromise.then((books) => {
        res.send(books);
    })


});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   // Retrieve the email parameter from the request URL and send the corresponding friend's details
   
      const isbn = req.params.isbn;

   let myPromise = new Promise((resolve,reject) => {
        resolve(books[isbn])
        })

    myPromise.then((book) => {
        res.send(book);
    })
   

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    const author = req.params.author;


    let myPromise = new Promise((resolve,reject) => {
        var result = Object.values(books).filter(book => book.author == author);
        resolve(result)
        })

    myPromise.then((book) => {
        res.send(book);
    })

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    let myPromise = new Promise((resolve,reject) => {
        var result = Object.values(books).filter(book => book.title == title);
        resolve(result)
        })

    myPromise.then((book) => {
        res.send(book);
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    if(Object.hasOwn(books, isbn)){
        res.send(books[isbn]['reviews']);
    }

});

module.exports.general = public_users;
