const myLibrary = [];

function Book(title, author, pages, isRead, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id;
}

// Creates a book from the given arguments, and stores the book object into an array
function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID()));
}
