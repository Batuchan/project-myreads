import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'

class Shelf extends Component {
  componentDidMount() {
    console.log(this);
  }
  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                this.props.books.map((book) => <Book updateBookShelf= {this.props.updateBookShelf} book={book} key={book.id} />)
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }

}

export default Shelf
