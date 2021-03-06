import React from 'react'
import PropTypes from 'prop-types';
import Book from "./Book";

const BookShelf = ({ books, shelf, onChangeShelf }) =>  {

    let shelfName;
    switch (shelf) {
        case 'currentlyReading': shelfName='Currently Reading';
            break;
        case 'wantToRead': shelfName='Want to Read';
            break;
        case 'read': shelfName='Read';
            break;
        default: shelfName='Without category';
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book => book.shelf === shelf).map( book =>
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={onChangeShelf}/>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    books: PropTypes.array,
    shelf: PropTypes.string,
    onChangeShelf: PropTypes.func,
};

export default BookShelf
