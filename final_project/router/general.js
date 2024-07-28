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
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   // Retrieve the email parameter from the request URL and send the corresponding friend's details
   const isbn = req.params.isbn;
   res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

    const author = req.params.author;

    var result = Object.values(books).filter(book => book.author == author);

    res.send(result);

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

    var result = Object.values(books).filter(book => book.title == title);

    res.send(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    const filtered = Object.fromEntries(
        Object.entries(books).filter(
           ([key, val])=> key == isbn
        )
     );

     var valuechecked = "reviews";

     for (var k in filtered){
        console.log(k);
       if(k ==  1)
       {
         var entry = filtered[k];
         for (var a in entry){
           console.log(entry[a]);
         }
     
       }                           
     }
      
    res.send(filtered);
});

module.exports.general = public_users;
