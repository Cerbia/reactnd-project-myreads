import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookList from "./BookList";
import SearchPage from "./SearchPage";
import * as BooksApi from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
    // TODO: Sprawdzić działanie wszystkich funkcji w BooksAPI
    state = {
        books: [],
    }

    componentDidMount() {
        BooksApi.getAll().then((data)=> {
            this.setState(() => ({
                books: data
            }))
        })
    }

    render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <BookList books={this.state.books}/>
        )} />
        <Route path='/search' render={(history) => (
            <SearchPage/>
        )} />
      </div>
    )
  }
}

export default BooksApp
