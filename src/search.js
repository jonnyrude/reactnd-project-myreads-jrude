import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './bookShelf'

/**
 * SearchPage Component
 *
 * Allows search for new books, and to add books to shelf
 * on main app page
 *
 * props.myReadingShelf = Array of book.id's on the myReadingShelf
 * props.myWantedShel = Array of book.id's on the WantToRead shelf
 * props.myReadShelf = Array of book.id's on the read shelf
 * props.add = function to add book to shelves (App's addBook function)
 */

class SearchPage extends React.Component {

    state = { searchResults: [],
        searchIDs: []
     }

     findBook = (id) => {

        return this.state.searchResults.find(book => {
            return book.id === id
        })
    }

    searchFunc = (string) => {
        BooksAPI.search(string).then((results) => {
            // console.log(results);
            if (results && !results.error) {
                let idsOnShelf = results.map(book => {
                    if (this.props.myReadingShelf.includes(book.id) ) {
                        book.shelf = 'currentlyReading';
                    } else if (this.props.myWantedShelf.includes(book.id)) {
                        book.shelf = 'wantToRead';
                    } else if (this.props.myReadShelf.includes(book.id)) {
                        book.shelf = 'read';
                    }
                    return book.id
                });
                this.setState({searchResults: results,
                    searchIDs: idsOnShelf});
            } else {
                this.setState({ searchResults: [], searchIDs: [] })
            }
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author"
                        onChange={(e) => this.searchFunc(e.target.value)}/>
                    </div>
                </div>
                <div className="list-books">
                    <div className="list-books-content">

                        {(this.state.searchIDs &&
                        <BookShelf
                            shelfName='Search Results'
                            getBook={this.findBook}
                            idsOnShelf={this.state.searchIDs}
                            move={(shelf, book) => this.props.add(shelf, book)}
                        />)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage