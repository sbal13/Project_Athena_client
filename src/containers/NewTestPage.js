import React from 'react';
import NewTestForm from '../components/NewTestForm'

class NewTestPage extends React.Component {
	componentDidMount(){
		if(!localStorage.getItem('jwt')){
			this.props.history.push('/login')
		} else if( this.props.currentUser.user_type === "student") {
			this.props.history.push('/dashboard')
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.currentUser.user_type && nextProps.currentUser.user_type !== "teacher") {
			nextProps.history.push('/dashboard')
		}
	}

	render(){
		return (
			<div>
				<NewTestForm history={this.props.history}/>
			</div>
	)}
}

export default NewTestPage