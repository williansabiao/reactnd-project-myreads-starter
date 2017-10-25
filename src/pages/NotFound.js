import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>My Reads</h1>
      </div>
      <section className="page-not-found">
        <h2 className="__red">Page not found!</h2>
        <p className="__bold">Back to <Link to='/'>home page</Link>.</p>
      </section>
    </div>
  )
}

export default NotFound;
