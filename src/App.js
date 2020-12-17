import React from 'react'
import { Route, Link } from 'react-router-dom'
import MyLibrary from "./MyLibrary";
import SearchPage from "./SearchPage";
import * as BooksApi from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
    // TODO: Sprawdzić działanie wszystkich funkcji w BooksAPI
    state = {
        books: []
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        BooksApi.getAll().then((data)=> {
            this.setState(() => ({
                books: data
            }))
        })
    }

    onChangeShelf = (book, shelf) => {
        BooksApi.update(book, shelf).then( (data) => {
            this.fetchBooks();
        })
    }

    render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <MyLibrary books={this.state.books} onChangeShelf={this.onChangeShelf}/>
        )} />
        <Route path='/search' render={(history) => (
            <SearchPage booksOnShelves={this.state.books} onChangeShelf={this.onChangeShelf}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
