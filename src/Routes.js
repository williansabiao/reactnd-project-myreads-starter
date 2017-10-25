import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyReads from './pages/MyReads';
import Search from './pages/Search';
import PropTypes from 'prop-types';

class Routes extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    updateBooksOnShelf: PropTypes.func.isRequired,
  };

  render () {
    let { updateBooksOnShelf, booksOnShelf } = this.props;
    return (
      <div>
        <Route exact path='/' render={() => <MyReads updateBooksOnShelf={updateBooksOnShelf} /> } />
        <Route exact path='/search' render={(route) => <Search route={route} updateBooksOnShelf={updateBooksOnShelf} booksOnShelf={booksOnShelf} />} />
      </div>
    )
  };
}

export default Routes;
