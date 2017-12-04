import React , {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		bookShelfTittle: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		bookShelfChanger: PropTypes.func.isRequired
	}

	render() {
		return (
			<div className='book-shelf'>
				<h2 className='bookshelf-title'>{this.props.bookShelfTittle}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{this.props.books.map((book) => (
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

export default BookShelf

