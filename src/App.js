import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './bookShelf';

class BooksApp extends React.Component {
  state = {
    // returns an array of book items currently on shelf
    // BooksAPI.getAll().then((books) => console.log(books))

    // Array of book objects
    shelvedBooks: [],

    // Arrays of book id's on each shelf
    currentlyReading : [],
    wantToRead : [],
    read : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // new State refreshed with all books on a shelf
      let updatedState = {
        shelvedBooks: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
      };
      books.map((book) => {
        updatedState.shelvedBooks.push(book);
        updatedState[book.shelf].push(book.id);
      })

      this.setState(updatedState);
    })
  }

  changeShelf = (shelf, book) => {
    console.log(shelf, book);
    // Make request to change on server
    BooksAPI.update(book, shelf).then((shelves) => {

      // update state to reflect book's new shelf
      this.setState((state) => {
        state.shelvedBooks.map(offShelf => {
          if (offShelf.id === book.id) {
            offShelf.shelf = shelf;
          }
        })
      })

      // API request returned updated shelves, so replace local state
      //console.log(shelves);
      this.setState( shelves )

    })

    // const theBook = this.state.shelvedBooks.find(offShelf => offShelf.id === book.id) || book;

  }

  getBook = (getID) => {
    return this.state.shelvedBooks.find(book => {
        return book.id === getID
      })
  }

  render() {
    return (
      <div className="app">

        {/* SEARCH PAGE */}
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>

        {/* MAIN PAGE */}
        <Route path="/" render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfName='Currently Reading'
                  idsOnShelf={this.state.currentlyReading}
                  getBook={this.getBook}
                  move={this.changeShelf}
                />

                <BookShelf
                  shelfName='Want to Read'
                  idsOnShelf={this.state.wantToRead}
                  getBook={this.getBook}
                  move={this.changeShelf}
                />
                <BookShelf
                  shelfName='Read'
                  idsOnShelf={this.state.read}
                  getBook={this.getBook}
                  move={this.changeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>

        )}/>
      </div>
    )
  }
}

export default BooksApp
