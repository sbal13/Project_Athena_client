import React from 'react';
import NewTestForm from '../components/NewTestForm'

class NewTestPage extends React.Component {
	componentDidMount(){
		if(!localStorage.getItem('jwt')){
			this.props.history.push('/login')
		} else if( this.props.currentUser.user_type !== "teacher") {
			this.props.history.push('/dashboard')
		}
	}

	render(){
		console.log(this.props)
		return (
			<div>
				<NewTestForm history={this.props.history}/>
			</div>
	)}
}

export default NewTestPage