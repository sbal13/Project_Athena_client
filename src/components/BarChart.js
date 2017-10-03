import React from 'react'
import {Bar} from 'react-chartjs-2';
import {Card, Select,Segment, Dropdown} from 'semantic-ui-react'
import {PERCENT_INTERVAL, SUBJECTS} from '../helpers/constants'


class BarChart extends React.Component {

	state={
		interval: 10,
		subjectFilter: "All subjects",
		assignmentFilter: "All assignments"
	}

	generateAllData = (assignments) => {
		const xAxisTicks = 100/this.state.interval

		const finalLabels = []
		const finalData = []
		let first = 0

		for (let i=0; i < xAxisTicks; i++){
			let second = first+this.state.interval
			finalLabels.push(`${first}%-${second}%`)

			finalData.push(
				assignments.filter(assignment => {
					const percent = assignment.issued_assignments.details.final_score/assignment.issued_assignments.assignment_details.total_points*100
					return (first || -1) < percent && percent <= second
				}).length
			)

			first = second
		}



		return {labels: finalLabels, dataPoints: finalData}
	}

	handleSelect = (event,data) => {
		this.setState({[data.name]: data.value})
	}

	applyFilters = () => {
		let final = this.props.studentAssignments

		if (this.state.subjectFilter !== "All subjects"){
			final = final.filter(assignment => assignment.issued_assignments.assignment_details.subject === this.state.subjectFilter)
		}
		if (this.state.assignmentFilter !== "All assignments"){
			console.log(final)
			final = final.filter(assignment => assignment.issued_assignments.assignment_details.id === this.state.assignmentFilter)
		}

		return final

	}
	
	render(){
		


		console.log(this.state)
		const subjects_and_all = [{key: 9, value: "All subjects", text: "All subjects"}, ...SUBJECTS]
		const assignmentOptions = [{key: this.props.assignments.length, value: "All assignments", text: "All assignments"}, ...this.props.assignments.map((assignment, index)=> ({key: index, value: assignment.details.id, text: assignment.details.title}))]

		const filteredAssignments = this.applyFilters()


		const {labels, dataPoints} = this.generateAllData(filteredAssignments)

		const data = {
		  labels: labels,
		  datasets: [
		    {
		      label: this.state.subjectFilter,
		      backgroundColor: 'rgba(255,99,132,0.2)',
		      borderColor: 'rgba(255,99,132,1)',
		      borderWidth: 1,
		      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		      hoverBorderColor: 'rgba(255,99,132,1)',
		      data: dataPoints
		    }
		  ]
		};


		return (
			<Card fluid>
				<Segment>
					<Select options={PERCENT_INTERVAL} value={this.state.interval} onChange={this.handleSelect} name="interval"/>
					<Select options={subjects_and_all} disabled={this.state.assignmentFilter !== "All assignments"} value={this.state.subjectFilter} onChange={this.handleSelect} name="subjectFilter"/>
					<Dropdown options={assignmentOptions} 
							  onChange={this.handleSelect}
							  closeOnChange={true} 
							  value = {this.state.assignmentFilter}
							  disabled={this.state.subjectFilter !== "All subjects"}
							  search 
							  selection 
							  name="assignmentFilter"/>
				</Segment>
				<Card.Content>
					<Bar
			          data={data}
			          width={100}
			          height={500}
			          options={{
			            maintainAspectRatio: false
			          }}
	       			/>

	       		</Card.Content>
			</Card>
	)}
 }


export default BarChart