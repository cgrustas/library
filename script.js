class Book {
  constructor(title, author, pages, status, id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
  }

  toggleStatus() {
    switch (this.status) {
      case "want-to-read":
        this.status = "reading";
        break;
      case "reading":
        this.status = "read";
        break;
      case "read":
        this.status = "want-to-read";
        break;
    }
  }
}

const LibraryApp = (() => {
  let myLibrary = [];

  // HTML references
  const libraryContainer = document.getElementById("library");
  const dialog = document.querySelector("dialog");
  const showDialogBtn = document.querySelector("dialog + button");
  const cancelDialogBtn = document.getElementById("cancel");
  const confirmDialogBtn = document.getElementById("confirm");
  const form = document.querySelector("form");

  function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
  }

  function removeBook(id) {
    myLibrary = myLibrary.filter((book) => book.id != id);
    displayBooks();
  }

  function displayBooks() {
    libraryContainer.replaceChildren();
    myLibrary.forEach((book) => {
      const card = createBookCard(book);
      libraryContainer.appendChild(card);
    });
  }

  function createBookCard(book) {
    const card = document.createElement("article");
    card.setAttribute("data-book-id", book.id);

    const title = document.createElement("h3");
    title.textContent = book.title;

    const info = document.createElement("dl");
    addDetail(info, "Author", book.author);
    addDetail(info, "Pages", book.pages);
    addDetail(info, "Read Status", book.status);

    const buttons = document.createElement("div");
    const statusButton = createStatusButton(book);
    const removeButton = createRemoveButton(book);
    buttons.appendChild(statusButton);
    buttons.appendChild(removeButton);

    card.append(title, info, buttons);
    return card;
  }

  function addDetail(container, label, value) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    container.append(dt, dd);
  }

  function createStatusButton(book) {
    const statusButton = document.createElement("button");
    statusButton.setAttribute("type", "button");
    statusButton.textContent = "Change Status";
    statusButton.addEventListener("click", () => {
      book.toggleStatus();
      displayBooks();
    });
    return statusButton;
  }

  function createRemoveButton(book) {
    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeBook(book.id));
    return removeButton;
  }

  function initDemoData() {
    myLibrary = [
      new Book("Don Quixote", "Miguel de Cervantes", 1072, "want-to-read"),
      new Book(
        "The Adventures of Huckleberry Finn",
        "Mark Twain",
        616,
        "reading"
      ),
      new Book("The Grapes of Wrath", "John Steinbeck", 464, "read"),
    ];
  }

  function attachEventListeners() {
    form.addEventListener("submit", (e) => handleFormSubmission(e));
    showDialogBtn.addEventListener("click", () => {
      clearValidationMessages();
      dialog.showModal();
    });
    cancelDialogBtn.addEventListener("click", () => {
      clearValidationMessages();
      dialog.close();
    });
  }

  /**
   * Checks for invalid (empty) inputs and submits the form when all inputs are valid.
   * Displays a custom error message when the user tries to submit an empty form field.
   * @param {Event} event - The form submission event
   */
  function handleFormSubmission(event) {
    event.preventDefault();

    // check title
    const title = document.getElementById("title");
    title.setCustomValidity("");
    if (!title.value) {
      title.setCustomValidity("The title field must be filled!");
      title.reportValidity();
      return;
    }

    // check author
    const author = document.getElementById("author");
    author.setCustomValidity("");
    if (!author.value) {
      author.setCustomValidity("The author field must be filled!");
      author.reportValidity();
      return;
    }

    // check pages
    const pages = document.getElementById("pages");
    pages.setCustomValidity("");
    if (!pages.value) {
      pages.setCustomValidity("The pages field must be filled!");
      pages.reportValidity();
      return;
    }

    const status = form.elements["read-status"].value;
    clearValidationMessages();
    addBookToLibrary(title.value, author.value, pages.value, status);
    displayBooks();
    form.reset();
    dialog.close();
  }

  /**
   * Clears custom validation messages
   */
  function clearValidationMessages() {
    document.getElementById("title").setCustomValidity("");
    document.getElementById("author").setCustomValidity("");
    document.getElementById("pages").setCustomValidity("");
  }

  function init() {
    initDemoData();
    displayBooks();
    attachEventListeners();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", LibraryApp.init);
