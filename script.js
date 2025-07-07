const book1 = new Book('Don Quixote', 'Miguel de Cervantes', 1072, false, 123);
const book2 = new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 616, false, 456);
const book3 = new Book('The Grapes of Wrath', 'John Steinbeck', 464, false, 789);

const myLibrary = [book1, book2, book3];

// represents a book in a library
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

// creates a book from the given arguments, and stores the book object into an array
function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead, crypto.randomUUID()));
}

// displays each book within the <div.library> on the page
function displayBooks() {
  // fetch container
  const library = document.getElementById('library');
  // clear the existing content from the container
  library.replaceChildren();
  // For each book in libary
  myLibrary.forEach((book) => {
    const card = createBookDisplay(book);
    // append the card to the library
    library.appendChild(card);
  });
}

// helper for displayBooks()
// returns an <article> with book details
function createBookDisplay(book) {
  const card = document.createElement('article');

  const bookTitle = createBookTitle(book);
  const bookInfo = createBookDetails(book);

  card.append(bookTitle);
  card.append(bookInfo);
  return card;
}


// helper for createBookDisplay()
// returns an <h3> with the book's title
function createBookTitle(book) {
  const bookTitle = document.createElement('h3');
  bookTitle.textContent = book.title;
  return bookTitle;
}

// helper for createBookDisplay()
// returns a <dl> with all the book info
function createBookDetails(book) {
  const bookInfo = document.createElement('dl');

  addBookDetail(bookInfo, 'author', book.author);
  addBookDetail(bookInfo, 'pages', book.pages);
  addBookDetail(bookInfo, 'Read Status', book.isRead ? 'Read' : 'Not Read');
  return bookInfo;
}

// helper for createBookDetails()
// appends a <dt/dd> label/value pair to the bookDetails container
function addBookDetail(bookDetails, label, value) {
  const dt = document.createElement('dt');
  dt.textContent = label;

  const dd = document.createElement('dd');
  dd.textContent = value;

  bookDetails.appendChild(dt);
  bookDetails.appendChild(dd);
}