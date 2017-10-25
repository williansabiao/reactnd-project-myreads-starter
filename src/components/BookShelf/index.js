import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book';

const BookShelf = ({title, books, loaded, shelfChange}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {!loaded && (
            <p>Loading...</p>
          )}
          {loaded && (!books || (books && books.length <= 0)) && (
            <p>No books to show</p>
          )}
          {loaded && books && books.length > 0 && books.map(( book ) => {
            return (
              <li key={book.id}>
                <Book book={ book } shelfChange={shelfChange} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  shelfChange: PropTypes.func,
}

export default BookShelf;
