class Book {
  constructor(title, author, pages, status, id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
  }
}

const LibraryApp = (() => {
  let myLibrary = [];

  // HTML references
  const libraryContainer = document.getElementById('library');
  const dialog = document.querySelector('dialog');
  const showDialogBtn = document.querySelector('dialog + button');
  const cancelDialogBtn = document.getElementById('cancel');
  const confirmDialogBtn = document.getElementById('confirm');
  const form = document.querySelector('form');

  function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
  }

  function displayBooks() {
    libraryContainer.replaceChildren();
    myLibrary.forEach(book => {
      const card = createBookCard(book);
      libraryContainer.appendChild(card);
    });
  }

  function createBookCard(book) {
    const card = document.createElement('article');
    const title = document.createElement('h3');
    title.textContent = book.title;

    const info = document.createElement('dl');
    addDetail(info, 'Author', book.author);
    addDetail(info, 'Pages', book.pages);
    addDetail(info, 'Read Status', book.status);

    card.append(title, info);
    return card;
  }

  function addDetail(container, label, value) {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    container.append(dt, dd);
  }

  function initDemoData() {
    myLibrary = [
      new Book('Don Quixote', 'Miguel de Cervantes', 1072, 'want-to-read'),
      new Book('The Adventures of Huckleberry Finn', 'Mark Twain', 616, 'reading'),
      new Book('The Grapes of Wrath', 'John Steinbeck', 464, 'read'),
    ];
  }

  function attachEventListeners() {
    showDialogBtn.addEventListener('click', () => dialog.showModal());
    cancelDialogBtn.addEventListener('click', () => dialog.close());
    confirmDialogBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const title = form.elements['title'].value; 
      const author = form.elements['author'].value;
      const pages = form.elements['pages'].value;
      const status = form.elements['read-status'].value;
      addBookToLibrary(title, author, pages, status);
    });
  }

  function init() {
    initDemoData();
    displayBooks();
    attachEventListeners();
  }

  return { init }; 
})();

document.addEventListener('DOMContentLoaded', LibraryApp.init);