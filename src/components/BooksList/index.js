import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as BooksAPI from './../../BooksAPI';
import BookShelf from '../BookShelf';
import utils from '../../utils';

class BooksList extends Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  };

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((data) => {
        this.setState({
          books: utils.orderBooks(data),
        });
      });
  };

  render () {
    return (
      <div>
        <BookShelf title="Currently Reading" books={this.state.books.currentlyReading} />
        <BookShelf title="Want to Read" books={this.state.books.wantToRead} />
        <BookShelf title="Read" books={this.state.books.read} />
      </div>
    )
  };
}

export default BooksList;
