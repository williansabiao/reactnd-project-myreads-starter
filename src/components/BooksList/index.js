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

  updateBookShelf(newShelf, book) {
    if(!book || !newShelf || (book.shelf === newShelf)) return;

    const actShelf = book.shelf;
    // Here is the problem, I want access and change the state, but this is undefined
    console.log(this.state.books, this.state.books[actShelf].indexOf(book));
  };

  render () {
    return (
      <div>
        <BookShelf title="Currently Reading" books={this.state.books.currentlyReading} shelfChange={this.updateBookShelf} />
        <BookShelf title="Want to Read" books={this.state.books.wantToRead} shelfChange={this.updateBookShelf} />
        <BookShelf title="Read" books={this.state.books.read} shelfChange={this.updateBookShelf} />
      </div>
    )
  };
}

export default BooksList;
