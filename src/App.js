import React from 'react';
import Routes from './Routes';
import './App.css';

class BooksApp extends React.Component {
  state = {
    booksOnShelf: []
  }

  booksOnShelfByID = (books) => books.map((book) => ({ id: book.id, shelf: book.shelf }))

  updateBooksOnShelf = (books) => {
    this.setState({ booksOnShelf: this.booksOnShelfByID(books) });
  }

  render() {
    return (
      <div className="app">
        <Routes updateBooksOnShelf={this.updateBooksOnShelf} booksOnShelf={this.state.booksOnShelf} />
      </div>
    )
  }
}

export default BooksApp
