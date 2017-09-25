import React from 'react';
import SignupForm from '../components/SignupForm'

class SignupPage extends React.Component {
	componentWillMount(){
		if(localStorage.getItem('jwt')){
			this.props.history.push('/index')
		}
	}
	render(){
		return (
			<div>
				<SignupForm history={this.props.history}/>
			</div>)
	}
}

export default SignupPage