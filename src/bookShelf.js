import React from 'react';
import BookItem from './bookItem';

/**
 * BookShelf Component
 *
 * Displays a grid of BookItem components to display books (objects)
 * Used by App's main page/route and Search component
 *
 * props.shelfName = Name of shelf displayed as Heading
 * props.idsOnShelf = Array of book.id's to be displayed on shelf
 * props.getBook = function to get book object, requires argument of book.id
 * props.move = function (changeShelf in App.js), moves book to new shelf *
 */

class BookShelf extends React.Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {this.props.idsOnShelf && this.props.idsOnShelf.map((id) => {
              let book = this.props.getBook(id);
              return <BookItem book={book} move={(shelf, bk) => this.props.move(shelf, bk)} key={book.id} />
            }
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf