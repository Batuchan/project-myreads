import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchs: [],
      query: ""
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

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch)
  }

  submitSearch() {
    if(this.state.query === "" || this.state.query === undefined) {
      return this.setState({searchs: []})
    }
    BooksAPI.search(this.state.query.trim()).then(res => {
      if(res.error) {
        return this.setState({searchs: []})
      }
      else {
        res.forEach(book => {
          let f = this.state.books.filter(b => b.id === book.id)
          if(f[0]) {
            book.shelf = f[0].shelf
          }
        })
        return this.setState({searchs: res})
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query}
            onChange={(e) => this.updateQuery(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.searchs.map((book) => <Book updateBookShelf={this.updateBookShelf} key={book.id} book={book} />)
          }
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchPage
