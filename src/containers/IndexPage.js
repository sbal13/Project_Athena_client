import React from 'react'
import AssignmentList from '../components/AssignmentList'
import {connect} from 'react-redux'
import {getAllAssignments} from '../actions/assignments'
import {Grid} from 'semantic-ui-react'


class IndexPage extends React.Component {


 	componentDidMount() {
 		if(this.props.currentUser.user_type !== "teacher") {
			this.props.history.push('/dashboard')
		} else{
    		this.props.getAssignments()
    	}
    }


	render(){

		const uniqueAssignments = this.props.allAssignments.filter(assignment => {
			return assignment.details.creator_id === assignment.details.teacher_id
		})

		return(
			<Grid centered columns={2}>
				<Grid.Column width={10}>
					{this.props.allAssignments.length > 0 ? <AssignmentList assignments={uniqueAssignments} history={this.props.history}/> : null}
				</Grid.Column>
			</Grid>
	)}
}

function mapStateToProps(state) {
	return {
		allAssignments: state.assignment.allAssignments	
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAssignments: () => {
	       dispatch(getAllAssignments())
	    }
	}
 }

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)