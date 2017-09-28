import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksList from './../components/BooksList';

class MyReads extends Component {
  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <BooksList />
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  };
}

export default MyReads;
