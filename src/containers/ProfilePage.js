import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../actions/users'
import TeacherProfilePage from './TeacherProfilePage'
import StudentProfilePage from './StudentProfilePage'

class ProfilePage extends React.Component {

	componentWillMount(){
		const userId = this.props.location.pathname.split("/")[2]
		this.props.getUser(userId)
	}

	componentWillUpdate(nextProps){

		const userId = nextProps.location.pathname.split("/")[2]

		if (this.props.user.id !== parseInt(userId,10)){
			this.props.getUser(userId)
		} 
	}

	render(){
		let profileType = null;
		if (this.props.user && this.props.user.user_type === "teacher") {
			profileType = <TeacherProfilePage history={this.props.history} teacher={this.props.user}/>
		} else if (this.props.user && this.props.user.user_type === "student") {
			profileType = <StudentProfilePage history={this.props.history} student={this.props.user} />
		}

		return profileType
	}
}

function mapStateToProps (state){
	return {
		user: state.user.user
	}
}

function mapDispatchToProps (dispatch){
	return {
		getUser: (id) => {
			return dispatch(getUser(id))
		}
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)