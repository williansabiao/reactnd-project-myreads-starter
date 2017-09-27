import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import * as BooksAPI from './../../BooksAPI';
import BookShelf from '../BookShelf';
import utils from '../../utils';

class BooksList extends Component {
  state = {
    loaded: false,
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: [],
    },
  };

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((data) => {
        this.setState({
          loaded: true,
          books: utils.orderBooks(data),
        });
      });
  };

  updateBookShelf = (newShelf, book) => {
    if(!book || !newShelf || (book.shelf === newShelf)) return;

    BooksAPI
      .update(book, newShelf)
      .then((response, body) => {
        console.log(response);
        if(!response || typeof response !== 'object') return;

        this.setState((prevState) => {
          const prevBooks = prevState.books;
          const actShelf = book.shelf;

          // Remove book from old shelf
          const bookPosition = prevBooks[actShelf].indexOf(book);
          if(bookPosition < 0) return {};

          prevBooks[actShelf].splice(bookPosition, 1);

          // TODO: remove none group and verify if newShelf is "none" to remove from the list only
          // Add book into new shelf
          prevBooks[newShelf] = prevBooks[newShelf] || [];
          // Change the shelf of current book
          book.shelf = newShelf;
          prevBooks[newShelf].push(book);

          return prevBooks;
        })
      })
  };

  render () {
    return (
      <div>
        <BookShelf title="Currently Reading" books={this.state.books.currentlyReading} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
        <BookShelf title="Want to Read" books={this.state.books.wantToRead} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
        <BookShelf title="Read" books={this.state.books.read} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
        <BookShelf title="None" books={this.state.books.none} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
      </div>
    )
  };
}

export default BooksList;
