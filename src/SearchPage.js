import React, {Component} from 'react'
import * as BooksApi from "./BooksAPI";
import Book from "./Book";
import {Link} from "react-router-dom";

class SearchPage extends Component {

    state = {
        search: [],
        searchValue: '',
    }

    handleChange = (searchValue) => {
        this.setState(() => ({
            searchValue,
        }));
        if(searchValue.length > 0){
            BooksApi.search(searchValue).then( books => {
                if(books.length>0){
                    const categorizedBooks = books.map(book => {
                        book.shelf = 'none';
                        const myBook = this.props.booksOnShelves.filter(shelfBook => book.id === shelfBook.id);
                        return myBook[0] ? myBook[0] : book;
                    });
                    this.setState(() => ({
                        search: categorizedBooks,
                    }))
                }
            })
            console.log(this.state);
        } else {
            this.setState(() => ({
                search: [],
            }))
        }
    }

    render(){
        const { searchValue } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='add-contact'
                    >
                        <button className="close-search">Close</button>
                    </Link>
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
                            onChange={(e)=>this.handleChange(e.target.value)}
                            value={this.state.searchValue}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.search.map( book =>
                            <li key={book.id}>
                                <Book book={book} onChangeShelf={this.props.onChangeShelf}/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage
