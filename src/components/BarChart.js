import React from 'react'
import {Bar} from 'react-chartjs-2';
import {Card, Select,Segment} from 'semantic-ui-react'
import {PERCENT_INTERVAL} from '../helpers/constants'


class BarChart extends React.Component {

	state={
		interval: 10
	}

	generateAllData = () => {
		const xAxisTicks = 100/this.state.interval

		const finalLabels = []
		const finalData = []
		let first = 0

		for (let i=0; i < xAxisTicks; i++){
			let second = first+this.state.interval
			finalLabels.push(`${first}%-${second}%`)

			finalData.push(
				this.props.studentAssignments.filter(assignment => {
					const percent = assignment.issued_assignments.details.final_score/assignment.issued_assignments.assignment_details.total_points*100
					return first < percent && percent <= second
				}).length
			)

			first = second
		}



		return {labels: finalLabels, dataPoints: finalData}
	}

	handleSelect = (event,data) => {
		this.setState({[data.name]: data.value})
	}
	
	render(){
		const {labels, dataPoints} = this.generateAllData()


		const data = {
		  labels: labels,
		  datasets: [
		    {
		      label: 'My First dataset',
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