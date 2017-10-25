import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { search as BooksAPISearch, getAll as BooksAPIGetAll } from './../BooksAPI';
import BookShelf from './../components/BookShelf';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    updateBooksOnShelf: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array.isRequired,
  };

  state = {
    query: '',
    books: [],
    loaded: true,
  };

  categorizeAndSetBooks = (books) => {
    let newBooks = [];
    if(books && typeof books === 'object' && !books.error) {
      let booksShown = this.props.booksOnShelf;
      newBooks = [...books];

      if(booksShown) {
        newBooks = newBooks.map((book) => {
          return booksShown.forEach((shownBook) => {
            if(shownBook.id === book.id) {
              book.shelf = shownBook.shelf;
              return book;
            }
          }) || book;
        });
      }
    }

    this.setState({ books: newBooks, loaded: true });
  }

  searchBooks = debounce((query) => { // parameter to be called async with setState
    query = query || this.state.query;
    if(query.length < 1) return;

    BooksAPISearch(query || this.state.query)
      .then((books) => this.categorizeAndSetBooks(books));
  }, 1000);

  updateQuery = (event) => {
    event.persist();
    const query = event.target.value;
    this.setState({ query, loaded: false });

    this.props.route.history.push({
      search: `query=${query}`,
    });

    // if query is empty, stop the search
    if(query.length < 1) return this.setState({ loaded: true, books: [] });

    // Wait until the user stop to write

    query && query.length > 0 && this.searchBooks();
  };

  componentDidMount() {
    const query = this.props.route.history.location.search.replace('?query=', '');
    if( query && query.length > 0) {
      this.setState({ query });
      this.searchBooks( query );
    }
    const { booksOnShelf, updateBooksOnShelf } = this.props;

    if(booksOnShelf.length === 0) {
      BooksAPIGetAll()
        .then((data) => {
          updateBooksOnShelf(data);
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.booksOnShelf !== this.props.booksOnShelf) && this.state.books.length > 0) {
      this.categorizeAndSetBooks(this.state.books);
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
