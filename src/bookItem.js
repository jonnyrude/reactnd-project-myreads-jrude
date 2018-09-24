import React from 'react';

/**
 * BookItem Component
 *
 * Used by BookShelf Components and Search Component
 * to display book objects
 *
 * props.book = a book object
 */
class BookItem extends React.Component {


  /**
   * @description creates HTML (JSX) for authors (handles varied input)
   * @param {array} authors - Array of 1-3 authors, or undefined
   * @returns {string} jsx/html for BookItem component
   */
  formatAuthors = (authors) => {
    let authorsString = '';

    if (authors) {
      const len = authors.length;

      for (let i = len -1; i >= 0; i--) {
        if (i === len - 1) {
          authorsString += authors[i];
        }
        else if (i === len - 2 ) {
          authorsString = `${authors[i]} & ${authorsString}`;
        } else {
          authorsString = `${authors[i]}, ${authorsString}`;
        }
      }
    }

    return <div key={authors} className="book-authors">{authorsString}</div>
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.smallThumbnail : ''})` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={this.props.book.shelf || 'none'} onChange={(e) => this.props.move(e.target.value, this.props.book)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read" >Read</option>
                <option value="none" >None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {/* Use formatAuthors method to format */}
          {this.formatAuthors(this.props.book.authors)}
        </div>
      </li>
    )
  }
}

export default BookItem