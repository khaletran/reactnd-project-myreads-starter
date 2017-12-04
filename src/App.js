import React, {Component} from 'react'
import {Link} from 'react-router-dom'
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  maxResult = 50
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      searchBooks: []
    }
    
  }
  // get all books to render 
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      this.setState({books: res})     
      console.log(res)
    })
  }    
  // get all books which are on specific shelf
  listBooks(shelf) {
    return this.state.books.filter((b) => b.shelf === shelf)
  }
  // get all searched books and tag 'shelf' property
  onUpdateSearch = (query) => {
    if(query) {
      BooksAPI.search(query, this.maxResult).then((result) => {
        console.log(result) // lack of 'shelf' property
        if(result) {
          result.forEach((book, index) => {
            let currentBook = this.state.books.find((b) => b.id===book.id)
            // add new 'shelf' property to books's search
            if(currentBook) {
              book.shelf = currentBook.shelf
            }
            else {
              book.shelf = 'none'
            }
            result[index] = book
          })
        }
        this.setState({searchBooks: result})
      })
    }
    else {
      this.setState({searchBooks:[]})
    }
    
  }
  // change the shelf state of books
  onShelfChanger = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: this.state.books.filter((b) => b.id !== book.id).concat([book])
        
      }))
    })
    
    }  

  render() {
    return (
       <Router>    
        <div className="app">
          <Switch>
            <Route exact path='/' render={()=>(
              <div className='list-books'>
               <div className='list-books-title' >
                 <h1>MyReads</h1>
               </div>
               <div className='list-books-content'>
                 <div>
                   <BookShelf 
                     bookShelfTittle='Currently Reading'
                     books={this.listBooks('currentlyReading')}
                     bookShelfChanger={this.onShelfChanger}
                   />
                   <BookShelf
                     bookShelfTittle='Want To Read'
                     books={this.listBooks('wantToRead')}
                     bookShelfChanger={this.onShelfChanger}
                   />
                   <BookShelf
                     bookShelfTittle='Read'
                     books={this.listBooks('read') }
                     bookShelfChanger={this.onShelfChanger}
                   />
                 </div>
               </div>
               <div className='open-search'>
                 <Link to='/search'>Add a book</Link>
               </div>
              </div>
            )} >
            </Route>
            <Route path='/search' render={({history})=>(
              <SearchBooks
                books={this.state.searchBooks}
                updateSearch={this.onUpdateSearch}
                bookShelfChanger={this.onShelfChanger}
              >
              </SearchBooks>
            )} >
            </Route>
          </Switch>        
        </div>
      </Router>
    )
  }
}

export default BooksApp
