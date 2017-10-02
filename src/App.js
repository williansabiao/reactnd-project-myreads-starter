import React from 'react';
import Routes from './Routes';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Routes />
      </div>
    )
  }
}

export default BooksApp
