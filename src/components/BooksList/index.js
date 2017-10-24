import React, { Component } from 'react';
import { getAll as BooksAPIGetAll } from './../../BooksAPI';
import BookShelf from '../BookShelf';
import PropTypes from 'prop-types';
import utils from '../../utils';

class BooksList extends Component {
  static propTypes = {
    updateBooksOnShelf: PropTypes.func.isRequired,
  }

  state = {
    loaded: true,
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
  }

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
        return data;
      })
      .then((books) => this.props.updateBooksOnShelf(books));
  }

  flattenBooks = (books) => [].concat(...Object.values(books))

  updateBookShelf = (newShelf, book) => {

    if(!book || !newShelf || (book.shelf === newShelf)) return;

    // *** IMPORTANT NOTE ***//
    // *** if I use JSON.assign, the state is changed when I manipulate the variable, using JSON.parse/JSON.stringify it's works properly ***//

    // let newBooks = JSON.assign({}, this.state.books);
    let newBooks = JSON.parse(JSON.stringify(this.state.books));

    const actShelf = book.shelf;

    // Remove book from old shelf
    const bookPosition = newBooks[actShelf].findIndex((newBook) => newBook.id === book.id);
    if(bookPosition < 0) return;

    newBooks[actShelf].splice(bookPosition, 1);

    newBooks[newShelf] = newBooks[newShelf] || [];

    // Change the shelf of current book
    newBooks[newShelf].push(book);

    this.setState({books: newBooks});
    this.props.updateBooksOnShelf(this.flattenBooks(newBooks));
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
