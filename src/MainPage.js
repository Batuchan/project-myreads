import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(book => {
      console.log(book)
      this.setState({ books: book})
    })
  }

  updateBookShelf = (book,shelf) => {
    BooksAPI.update(book,shelf)
    .then(resp => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

          <Shelf updateBookShelf= {this.updateBookShelf} title="Currently Reading" books= {this.state.books.filter(f => f.shelf === "currentlyReading")} />
          <Shelf updateBookShelf= {this.updateBookShelf} title="Read" books= {this.state.books.filter(f => f.shelf === "read")} />
          <Shelf updateBookShelf= {this.updateBookShelf} title="Want To Read" books= {this.state.books.filter(f => f.shelf === "wantToRead")} />

        </div>
        <div className="open-search">
          <Link className="open-search" to="/search">Add a book</Link>
        </div>
      </div>
    )
  }

}

export default MainPage
