import React from 'react';
import BookItem from './bookItem';


class BookShelf extends React.Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {this.props.idsOnShelf && this.props.idsOnShelf.map( (id) =>
                            {let book = this.props.getBook(id);
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