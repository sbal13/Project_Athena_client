import React from 'react';
import NewTestForm from '../components/NewTestForm'

class NewTestPage extends React.Component {
	render(){
		return (
			<div>
				<NewTestForm history={this.props.history}/>
			</div>
	)}
}

export default NewTestPage