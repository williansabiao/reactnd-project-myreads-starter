import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksList from './../components/BooksList';

const MyReads = ({updateBooksOnShelf}) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <BooksList updateBooksOnShelf={updateBooksOnShelf} />
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

MyReads.propTypes = {
  updateBooksOnShelf: PropTypes.func.isRequired,
}

export default MyReads;
