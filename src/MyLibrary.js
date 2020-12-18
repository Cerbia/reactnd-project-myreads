import React, {Component} from 'react'
import BookShelf from "./BookShelf";
import { Link } from 'react-router-dom';

class MyLibrary extends Component {

    render(){
        const { books, onChangeShelf } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books={books} shelf={'currentlyReading'} onChangeShelf={onChangeShelf}/>
                        <BookShelf books={books} shelf={'wantToRead'} onChangeShelf={onChangeShelf}/>
                        <BookShelf books={books} shelf={'read'} onChangeShelf={onChangeShelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                        className='add-contact'
                    ><button>Add a book</button></Link>

                </div>
            </div>
        );
    }
}

export default MyLibrary
