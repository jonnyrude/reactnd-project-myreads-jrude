import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from './bookItem';
import BookShelf from './bookShelf'


class SearchPage extends React.Component {

    searchFunc = (string) => {

        BooksAPI.search(string).then((results) => {
            // console.log(results);
            if (results && !results.error) {
                let idsOnShelf = results.map(book => book.id);
                this.setState({searchResults: results,
                    searchIDs: idsOnShelf});
            } else {
                this.setState({ searchResults: [], searchIDs: [] })
            }
        })
    }

    state = { searchResults: [],
        searchIDs: []
     }

    findBook = (id) => {

        return this.state.searchResults.find(book => {
            return book.id === id
        })
    }


    // TODO: Onstatechange - create array of book id's to pass to shelf

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

                        {/*this.state.searchResults && this.state.searchResults.map( book =>
                            <BookItem
                                book={book}
                                key={book.id}
                                move={(shelf, book) => this.props.move(shelf, book)}
                            />
                        )
                        */}
                        {/* TODO:   1. Handle missing images
                                    2. & authors
                                    3. Place these results in a shelf names Search Results (get the grid :)*/}
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                    </div>
                </div>

                <div className="search-books-results">
                <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}

export default SearchPage