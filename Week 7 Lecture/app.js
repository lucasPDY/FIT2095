let express = require("express");
let app = express();
let books = require("./routers/books");
let authors = require("./routers/authors");


// const getBooks = (req, res) => {
//     res.json({msg: "Hello"});
// }
app.get("/books", books.getBooks);

app.post("/books", books.addNewBook);
app.get("/deleteAllBooks", books.deleteAll)

app.get("/author",authors.getAuthors);

app.listen(8080)

