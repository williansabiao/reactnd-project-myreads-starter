import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksList from './../components/BooksList';

class MyReads extends Component {
  static propTypes = {
    updateBooks: PropTypes.func.isRequired,
  };

  render () {
    const { updateBooks } = this.props;
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BooksList updateBooks={updateBooks} />
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  };
}

export default MyReads;
