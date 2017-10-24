import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksList from './../components/BooksList';

class MyReads extends Component {
  static propTypes = {
    updateBooksOnShelf: PropTypes.func.isRequired,
  };

  render () {
    const { updateBooksOnShelf } = this.props;

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
  };
}

export default MyReads;
