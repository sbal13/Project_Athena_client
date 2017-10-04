import React from 'react'
import {Bar} from 'react-chartjs-2';
import {Card, Select,Segment, Dropdown} from 'semantic-ui-react'
import {PERCENT_INTERVAL, SUBJECTS} from '../helpers/constants'
import moment from 'moment'


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
		


		const subjects_and_all = [{key: 9, value: "All subjects", text: "All subjects"}, ...SUBJECTS]
		const assignmentOptions = [{key: this.props.assignments.length, value: "All assignments", text: "All assignments"}, ...this.props.assignments.map((assignment, index)=> ({key: index, value: assignment.details.id, text: (assignment.details.historical ? assignment.details.title + ` (HISTORICAL ${moment(assignment.details.created_at).format("MM/DD/YYYY")})` : assignment.details.title)}))]

		const filteredAssignments = this.applyFilters()


		const {labels, dataPoints} = this.generateAllData(filteredAssignments)


		const color1 = Math.round(Math.random() * 255)
		const color2 = Math.round(Math.random() * 255)
		const color3 = Math.round(Math.random() * 255)

		const borderColorString = `rgba(${color1},${color2},${color3},1)`
		const fillColorString = `rgba(${color1},${color2},${color3},0.5)`

		const hoverBorderColorString = `rgba(${color1},${color2},${color3},1)`
		const hoverFillColorString = `rgba(${color1},${color2},${color3},0.6)`


		const data = {
		  labels: labels,
		  datasets: [
		    {
		      label: this.state.subjectFilter,
		      backgroundColor: fillColorString,
		      borderColor: borderColorString,
		      borderWidth: 1,
		      hoverBackgroundColor: hoverFillColorString,
		      hoverBorderColor: hoverBorderColorString,
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