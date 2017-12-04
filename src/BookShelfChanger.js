import React , {Component} from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		bookShelfChanger: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}	
	componentDidMount() {		
		this.setState({value: this.props.book.shelf})
	}
	handleChange = (event) => {
		this.setState({value:event.target.value})
		this.props.bookShelfChanger(this.props.book, event.target.value)
		}		
	render() {
		return (
			<div className="book-shelf-changer">
			  <select 
			  	value={this.state.value}
			  	onChange={this.handleChange}
			  >
			    <option value="none" disabled>Move to...</option>
			    <option value="currentlyReading">Currently Reading</option>
			    <option value="wantToRead">Want to Read</option>
			    <option value="read">Read</option>
			    <option value="none">None</option>
			  </select>
			</div>
		)
	}
}







export default BookShelfChanger