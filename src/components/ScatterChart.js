import React from 'react'
import {Scatter} from 'react-chartjs-2';
import {Card, Select, Segment, Dropdown} from 'semantic-ui-react'
import {SUBJECTS} from '../helpers/constants'
import moment from 'moment';
import DatePicker from 'react-datepicker'

class ScatterChart extends React.Component {

	state={
		startDate: null,
		endDate: null,
		studentFilter: "All students",
		subjectFilter: "All subjects"
	}

	componentDidMount(){
			this.setState({
				startDate: this.props.range.min,
				endDate: this.props.range.max
			})
	}

	applyFilters = () => {
		let final = this.props.studentAssignments

		if (this.state.studentFilter !== "All students"){
			final = final.filter(assignment => assignment.issued_assignments.details.student_id === this.state.studentFilter)
		}

		if (this.state.subjectFilter !== "All subjects"){
			final = final.filter(assignment => assignment.issued_assignments.assignment_details.subject === this.state.subjectFilter)
		}

		return final

	}


	handleSelect = (event,data) => {
		this.setState({[data.name]: data.value})
	}

	handleMinChange = (date) => {
		this.setState({startDate: date})
	}
	handleMaxChange = (date) => {
		this.setState({endDate: date})
	}
	
	render(){

		const studentOptions = [{key: this.props.students.length, value: "All students", text: "All students"}, ...this.props.students.map((student,index) => ({key: index, value: student.id, text: student.username}))]
		const subjectOptions = [{key: 9, value: "All subjects", text: "All subjects"}, ...SUBJECTS]

		const filteredAssignments = this.applyFilters()

		const renderedData = filteredAssignments.map(assignment =>{
			const percent = Math.round(assignment.issued_assignments.details.final_score/assignment.issued_assignments.assignment_details.total_points*100)

			return {x: moment(assignment.issued_assignments.details.finalized_date).format('MM DD YYYY h:mm:ss a'), y: percent}
		})


		const color1 = Math.round(Math.random() * 255)
		const color2 = Math.round(Math.random() * 255)
		const color3 = Math.round(Math.random() * 255)

		const colorString = `rgba(${color1},${color2},${color3},1)`

		const dataset = [{
		      label: this.state.subjectFilter,
		      backgroundColor: `${colorString}`,
		      pointBorderColor: `${colorString}`,
		      pointBackgroundColor: `${colorString}`,
		      pointBorderWidth: 2,
		      pointHoverRadius: 5,
		      pointHoverBackgroundColor: `${colorString}`,
		      pointHoverBorderColor: 'rgba(220,220,220,1)',
		      pointHoverBorderWidth: 2,
		      pointRadius: 4,
		      pointHitRadius: 10,
		      data: renderedData
		    }]



		const data = {
		  labels: ['Scatter'],
		  datasets: dataset
		};

		let rangeStart = this.state.startDate ? this.state.startDate.clone().startOf('day') : moment()
		let rangeEnd = this.state.endDate ? this.state.endDate.clone().endOf('day') : moment()

		const differenceInDays = rangeEnd.diff(rangeStart, 'days')

		let timeOptions = {unit: 'day', stepSize: 1}

		if (differenceInDays > 7 && differenceInDays < 30){
			timeOptions.stepSize = 7
		} else if(differenceInDays > 30){
			timeOptions.unit = "month"
		}

		console.log(this.state)


		return (
			<Card fluid>
				<Segment>
					<div className="ui input">
						<DatePicker selected={this.state.startDate} minDate= {this.props.range.min} maxDate={this.state.endDate} onChange={this.handleMinChange}/>
						<DatePicker selected={this.state.endDate} maxDate={this.props.range.max} minDate={this.state.startDate} onChange={this.handleMaxChange}/>
						<Dropdown onChange={this.handleSelect} 
									  name="studentFilter"
									  search 
							  		  selection 
									  closeOnChange={true}
									  value={this.state.studentFilter} 
									  options={studentOptions}/>
						<Select onChange={this.handleSelect} 
									  name="subjectFilter" 
									  value={this.state.subjectFilter} 
									  options={subjectOptions}/>
					</div>
				</Segment>
				<Card.Content>
					<Scatter
			          data={data}
			          width={100}
			          height={500}
			          options={{
				        scales: {
				            xAxes: [{
				                type: 'time',
				                time: {
				                    unit: timeOptions.unit,
				                    stepSize: timeOptions.stepSize,
				                    min: rangeStart,
				                    max: rangeEnd
				                }
				            }]
				        },
			            maintainAspectRatio: false
			          }}
	       			/>

	       		</Card.Content>
			</Card>
	)}
 }


export default ScatterChart