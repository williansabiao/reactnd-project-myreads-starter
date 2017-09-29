import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search as BooksAPISearch } from './../BooksAPI';
import BookShelf from './../components/BookShelf';

const WAIT_INTERVAL = 1000;

class Search extends Component {
  state = {
    query: '',
    books: [],
    loaded: true,
  }

  timer = null;

  searchBooks = (query) => { // parameter to be called async with setState
    BooksAPISearch(query || this.state.query)
      .then((response) => {
        if(!response || typeof response !== 'object' || response.error) {
          return this.setState({ loaded: true, books: [] });
        }

        this.setState({books: response, loaded: true});
      });
  };

  updateQuery = (event) => {
    const query = event.target.value;
    this.setState({ query, loaded: false });

    this.props.history.push({
      search: `query=${query}`,
    });

    // Wait until the user stop to write
    clearTimeout(this.timer);
    this.timer = setTimeout(query && query.length > 0 && this.searchBooks, WAIT_INTERVAL);
  };

  componentDidMount() {
    const query = this.props.history.location.search.replace('?query=', '');
    if( query && query.length > 0) {
      this.setState({ query });
      this.searchBooks(query);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.updateQuery} value={this.state.query} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf title={`Results to ${this.state.query}`} books={this.state.books} loaded={this.state.loaded} />
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
