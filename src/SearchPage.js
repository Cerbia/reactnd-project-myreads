import React, {Component} from 'react'
import * as BooksApi from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { debounce } from 'throttle-debounce';
import { has } from 'lodash';

class SearchPage extends Component {

    state = {
        search: [],
        searchValue: '',
    }

    handleChange = (searchValue) => {
        const { booksOnShelves } = this.props
        this.setState(() => ({
            searchValue,
        }));
        if(searchValue.length > 0){
            BooksApi.search(searchValue).then( books => {
                console.log('books', books);
                if(books.length>0 && !has(books, 'error')){
                    const categorizedBooks = books.map(book => {
                        book.shelf = 'none';
                        const myBook = booksOnShelves.filter(shelfBook => book.id === shelfBook.id);
                        return myBook[0] ? myBook[0] : book;
                    });
                    this.setState(() => ({
                        search: categorizedBooks,
                    }))
                } else {
                    this.setState(() => ({
                        search: [],
                    }))
                }
            })
        } else {
            this.setState(() => ({
                search: [],
            }))
        }
    }

    render(){
        const { searchValue, search } = this.state;
        const { onChangeShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='add-contact close-search'
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => debounce(500, false, this.handleChange(e.target.value))}
                            value={searchValue}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {search.map( book =>
                            <li key={book.id}>
                                <Book book={book} onChangeShelf={onChangeShelf}/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    booksOnShelves: PropTypes.array,
    onChangeShelf: PropTypes.func,
};

export default SearchPage
