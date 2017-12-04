import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Debounce} from 'react-throttle'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		updateSearch: PropTypes.func.isRequired
	}
	onSearch = (query) => {
		this.props.updateSearch(query.trim())
	}
	componentWillUnmount() {
		this.props.updateSearch('')
	}
	render() {
		return (
			<div className="search-books">
			  <div className="search-books-bar">
			    <Link className="close-search" to='/'>Close</Link>
			    <div className="search-books-input-wrapper">
			    	<Debounce time='800' handler='onChange'>	      
				      <input 
				      	type="text" 
				      	placeholder="Search by title or author"
				      	onChange={(event) => this.onSearch(event.target.value)}
				      />
				    </Debounce>
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
			    	{this.props.books.map((book)=>(
			    		<li key={book.id}>
							<Book
								book={book}
								bookShelfChanger={this.props.bookShelfChanger}
							/>
						</li>
			    	))}
			    </ol>
			  </div>
			</div>
		)
	}	
}

export default SearchBooks

