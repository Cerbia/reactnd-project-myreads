import React, {Component} from 'react'
import BookShelf from "./BookShelf";

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
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        );
    }
}

export default MyLibrary
