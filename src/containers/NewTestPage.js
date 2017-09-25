import React from 'react';
import NewTestForm from '../components/NewTestForm'

class NewTestPage extends React.Component {
	componentDidMount(){
		if(!localStorage.getItem('jwt')){
			this.props.history.push('/login')
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