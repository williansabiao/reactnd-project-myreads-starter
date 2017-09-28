import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyReads from './pages/MyReads';
import Search from './pages/Search';

class Routes extends Component {
  render () {
    return (
      <div>
        <Route exact path='/' render={() => (
          <MyReads />
        )} />

        <Route exact path='/search' render={() => (
          <Search />
        )} />
      </div>
    )
  };
}

export default Routes;
