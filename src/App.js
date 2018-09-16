import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookItem from './bookItem';

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
    BooksAPI.update(book, shelf).then((shelves) => {
      console.log(shelves);
      this.setState( shelves ) // TODO: working?

      // this.setState((state) => {
      //   state.shelvedBooks.map(offShelf => {
      //     if (offShelf.id === book.id) {
      //       offShelf = book;
      //     }
      //   })
      // })

    })

    // const theBook = this.state.shelvedBooks.find(offShelf => offShelf.id === book.id) || book;

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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.shelvedBooks.map(book => (
                         (this.state.currentlyReading.includes(book.id) && (
                          <BookItem book={book} move={this.changeShelf} key={book.id} />
                        ))
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.shelvedBooks.map(book =>
                        (this.state.wantToRead.includes(book.id) && (
                          <BookItem book={book} move={this.changeShelf} key={book.id}/>
                        ))
                      )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.shelvedBooks.map(book =>
                        (this.state.read.includes(book.id) && (
                          <BookItem book={book} move={this.changeShelf} key={book.id}/>
                        ))
                      )}
                    </ol>
                  </div>
                </div>
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
