import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MyReads from './pages/MyReads';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import PropTypes from 'prop-types';

const Routes = ({updateBooksOnShelf, booksOnShelf}) => {
  return (
    <Switch>
      <Route exact path='/' render={() => <MyReads updateBooksOnShelf={updateBooksOnShelf} /> } />
      <Route exact path='/search' render={(route) => <Search route={route} updateBooksOnShelf={updateBooksOnShelf} booksOnShelf={booksOnShelf} />} />
      <Route component={NotFound}/>
    </Switch>
  )
}

Routes.propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
  updateBooksOnShelf: PropTypes.func.isRequired,
}


export default Routes;
