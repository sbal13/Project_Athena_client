import React from 'react';
import SignupForm from '../components/SignupForm'

class SignupPage extends React.Component {
	render(){
		return (
		<div>
			<SignupForm history={this.props.history}/>
		</div>)
	}
}

export default SignupPage