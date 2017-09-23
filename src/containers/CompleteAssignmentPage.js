import React from 'react'
import {connect} from 'react-redux'
import {getAssignment} from '../actions/assignments'
import ActiveTest from '../components/ActiveTest'

class CompleteAssignmentPage extends React.Component{

	componentDidMount(){
		const assignmentId = this.props.location.pathname.split("/")[2]
		this.props.getAssignment(assignmentId)
	}

	render(){
		return Object.keys(this.props.assignment).length > 0 ? <ActiveTest history={this.props.history} assignment={this.props.assignment}/> : null
	}
}



function mapDispatchToProps(dispatch){
	return {
		getAssignment: (id) => {
			dispatch(getAssignment(id))
		}
	}
}
function mapStateToProps(state){
	return {
		assignment: state.assignment.currentAssignment
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteAssignmentPage)