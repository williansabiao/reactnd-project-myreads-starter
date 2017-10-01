import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyReads from './pages/MyReads';
import Search from './pages/Search';
import utils from './utils';

class Routes extends Component {
  state = {
    booksInShelf: null,
  };

  updateBooksOnShelf = (books) => {
    if(!books || typeof books !== 'object') return;

    books = utils.orderBooks.flattenShelf(books);

    this.setState({ booksOnShelf: books || null });
  };

  render () {
    return (
      <div>
        <Route exact path='/' render={() => <MyReads updateBooks={this.updateBooksOnShelf} /> } />
        <Route exact path='/search' render={(route) => <Search booksOnShelf={this.state.booksOnShelf} route={route} />} />
      </div>
    )
  };
}

export default Routes;
