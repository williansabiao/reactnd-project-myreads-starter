import React from 'react';
import { update as BooksAPIUpdate } from './../../BooksAPI';
import PropTypes from 'prop-types';

const Book = ({book, shelfChange}) => {
  const bookOnChange = (event) => {
    const newShelf = event.target.value;

    BooksAPIUpdate(book, newShelf)
      .then((response) => {
        if (!response || typeof response !== 'object') return;

        shelfChange &&
        typeof shelfChange === 'function' &&
        shelfChange(newShelf, book);
      })
  }

  if(!book.imageLinks || !book.imageLinks.smallThumbnail) book.imageLinks = { smallThumbnail: 'http://via.placeholder.com/128x193?text=No%20Cover' };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={book.shelf || "none"} onChange={bookOnChange}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfChange: PropTypes.func,
}

export default Book;
