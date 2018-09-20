import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './search';
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
    this.refreshBooks();
  }


  refreshBooks = () => {
    BooksAPI.getAll().then((books) => {
      // new State refreshed with all books on a shelf
      let updatedState = {
        shelvedBooks: [], currentlyReading: [],
        wantToRead: [],   read: []
      };
      books.map((book) => {
        updatedState.shelvedBooks.push(book);
        updatedState[book.shelf].push(book.id);
      })

      this.setState(updatedState);
    })
  }

  changeShelf = (shelf, book) => {
    // console.log(shelf, book);
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
      console.log(shelves);
      this.setState( shelves )

    })
  }

  getBook = (getID) => {
    return this.state.shelvedBooks.find(book => {
        return book.id === getID
      })
  }

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
              <Link to="/search">Add a book</Link>
            </div>
          </div>

        )}/>
      </div>
    )
  }
}

export default BooksApp
