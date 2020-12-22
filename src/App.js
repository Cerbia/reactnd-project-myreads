import React from 'react';
import { Route } from 'react-router-dom';
import MyLibrary from "./MyLibrary";
import SearchPage from "./SearchPage";
import * as BooksApi from './BooksAPI';

import './App.css';

class BooksApp extends React.Component {

    state = {
        books: []
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = async () => {
        const books = await BooksApi.getAll();
        this.setState({books});

    }

    onChangeShelf = (book, shelf) => {
        BooksApi.update(book, shelf).then( (data) => {
            this.fetchBooks();
        })
    }

    render() {
    return (
      <div className="app">
        <Route exact path='/'>
            <MyLibrary books={this.state.books} onChangeShelf={this.onChangeShelf}/>
        </Route>
        <Route path='/search' render={(history) => (
            <SearchPage booksOnShelves={this.state.books} onChangeShelf={this.onChangeShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
