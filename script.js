const book1 = new Book('Don Quixote', 'Miguel de Cervantes', 1072, false, 123);
const book2 = new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 616, false, 456);
const book3 = new Book('The Grapes of Wrath', 'John Steinbeck', 464, false, 789);

const myLibrary = [book1, book2, book3];

// Represents a book in a library
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

// Displays each book on the web page
function displayBooks() {

}

