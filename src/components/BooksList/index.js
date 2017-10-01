import React, { Component } from 'react';
import { getAll as BooksAPIGetAll } from './../../BooksAPI';
import BookShelf from '../BookShelf';
import PropTypes from 'prop-types';
import utils from '../../utils';

class BooksList extends Component {
  static propTypes = {
    updateBooks: PropTypes.func,
  };

  state = {
    loaded: true,
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  };

  componentDidMount() {
    this.setState({ loaded: false });
    let books = [];

    BooksAPIGetAll()
      .then((data) => {
        books = utils.orderBooks.byShelf(data);
        this.setState({
          loaded: true,
          books: books,
        });
        return books;
      })
      .then((books) => this.props.updateBooks(books));
  };

  updateBookShelf = (newShelf, book) => {
    if(!book || !newShelf || (book.shelf === newShelf)) return;

    this.setState((prevState) => {
      const prevBooks = prevState.books;
      const actShelf = book.shelf;

      // Remove book from old shelf
      const bookPosition = prevBooks[actShelf].indexOf(book);
      if(bookPosition < 0) return {};

      prevBooks[actShelf].splice(bookPosition, 1);

      prevBooks[newShelf] = prevBooks[newShelf] || [];

      // Change the shelf of current book
      book.shelf = newShelf;
      prevBooks[newShelf].push(book);

      this.props.updateBooks(prevBooks);
      return prevBooks;
    })
  };

  render () {
    return (
      <div>
        <BookShelf title="Currently Reading" books={this.state.books.currentlyReading} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
        <BookShelf title="Want to Read" books={this.state.books.wantToRead} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
        <BookShelf title="Read" books={this.state.books.read} shelfChange={this.updateBookShelf} loaded={this.state.loaded} />
      </div>
    )
  };
}

export default BooksList;
