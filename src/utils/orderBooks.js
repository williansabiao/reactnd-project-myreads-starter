const byShelf = (booksList) => {
  let newBookList = {};

  booksList.forEach((book) => {
    newBookList[book.shelf] = newBookList[book.shelf] || [];
    newBookList[book.shelf].push(book);
  });

  return newBookList;
};

const flattenShelf = (booksListInShelf) => {
  return Object.keys(booksListInShelf).reduce((prev, key) => {
    return (prev || []).concat(booksListInShelf[key]);
  }, 0);
};

const byID = (books) => books.map((book) => book.id);

export default { byShelf, flattenShelf, byID };
