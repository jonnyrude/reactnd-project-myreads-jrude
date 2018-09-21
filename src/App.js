import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchPage from './search';
import BookShelf from './bookShelf';

class BooksApp extends React.Component {
  state = {
    // Array of book objects
    shelvedBooks: [],
    // Arrays of book id's on each shelf
    currentlyReading : [],
    wantToRead : [],
    read : [],
    shelfNames : [
      {name: 'Currently Reading', propName: 'currentlyReading'},
      {name: 'Want to Read', propName:'wantToRead'},
      {name:'Read', propName: 'read'}]
  }

  /**
   * Collect books from BooksAPI upon start of App
   */
  componentDidMount() {
    this.refreshBooks();
  }

  /**
   * Logic to collect book objects from BooksAPI
   */
  refreshBooks = () => {
    // Request new books
    BooksAPI.getAll().then((books) => {
      // create updatedState object to replace old state
      let updatedState = {
        shelvedBooks: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
      };

      // fill updatedState with refreshed books
      //books.map((book) => {
        for (const book of books) {
        updatedState.shelvedBooks.push(book);
        updatedState[book.shelf].push(book.id);
      }

      // finally, replace state
      this.setState(updatedState);
    })
  }

  /**
   * Move a book - used to change a book's shelf
   * Passed as a Prop to each Shelf
   */
  changeShelf = (shelf, book) => {
    // Make request to change on server
    BooksAPI.update(book, shelf).then((shelves) => {

      // update state of App to reflect the change
      this.setState((state) => {
        //state.shelvedBooks.map(offShelf => {
        for (const offShelf of state.shelvedBooks) {
          if (offShelf.id === book.id) {
            offShelf.shelf = shelf;
          }
        }
      })

      // API request ((above) returns updated shelves, so
      // use that to update state
      this.setState( shelves );
    })
  }

  /**
   * Returns a book object stored in App's State
   * Passed as a Prop to BookShelf components
   */
  getBook = (getID) => {
    return this.state.shelvedBooks.find(book => {
        return book.id === getID;
      })
  }

  /**
   * Adds book to App State from Search (component)
   * Passed as Prop to Search component
   */
  addBook = (shelf, book) => {
    this.changeShelf(shelf, book);
    this.refreshBooks();
  }

  render() {
    return (
      <div className="app">

        {/* SEARCH PAGE */}
        <Route path="/search" render={() => (
          <SearchPage
            add={this.addBook}
            myReadingShelf={this.state.currentlyReading}
            myWantedShelf={this.state.wantToRead}
            myReadShelf={this.state.read}
          />
        )}/>

        {/* MAIN PAGE */}
        <Route path="/" exact render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                {this.state.shelfNames.map(shelf => {
                  return <BookShelf
                  shelfName={shelf.name}
                  idsOnShelf={this.state[shelf.propName]}
                  getBook={this.getBook}
                  move={this.changeShelf}
                  key={shelf.propName}
                />
                })}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp