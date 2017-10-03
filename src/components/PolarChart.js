import React from 'react';
import {Polar} from 'react-chartjs-2';
import {Card, Segment, Dropdown} from 'semantic-ui-react'


class PolarChart extends React.Component{
  state = {
    studentFilter: null
  }

  componentDidMount(){
    if (!this.state.studentFilter){
      this.setState({
        studentFilter: this.props.students[0].id
      })
    }
  }

  handleSelect = (event,data) => {
    this.setState({[data.name]: data.value})
  }

  getSingleStudentAssignments = () => {
    return this.props.studentAssignments.filter(assignment => assignment.issued_assignments.details.student_id === this.state.studentFilter)
  }

  render() {
    const studentOptions = this.props.students.map((student,index) => ({key: index, value: student.id, text: student.username}))

    const subjects =[
      "English",
      "Math",
      "Chemistry",
      "Biology",
      "Writing",
      "Grammar",
      "Physics",
      "Foreign Language",
      "History"
    ]

    const studentAssignmentsToDisplay = this.getSingleStudentAssignments()

    let renderedData = subjects.map(subject => {
      const assignmentsBySubject = studentAssignmentsToDisplay.filter(assignment => assignment.issued_assignments.assignment_details.subject === subject)

      if (assignmentsBySubject.length > 0){
        let totalPercentage = 0
        assignmentsBySubject.forEach(assignment => {
            const percent = assignment.issued_assignments.details.final_score/assignment.issued_assignments.assignment_details.total_points*100
            totalPercentage += percent
        })
        const averagePercentage = totalPercentage/assignmentsBySubject.length

        const color1 = Math.round(Math.random() * 255)
        const color2 = Math.round(Math.random() * 255)
        const color3 = Math.round(Math.random() * 255)

        const colorString = `rgba(${color1},${color2},${color3},0.5)`

        return {subject: subject, percent:averagePercentage, color: colorString} 
      } else {
        return null
      }
    })

    renderedData = renderedData.filter(data => data)

    const data = {
      datasets: [{
        data: renderedData.map(data => data.percent),
        backgroundColor: renderedData.map(data => data.color),
        label: 'My dataset' // for legend
      }],
      labels: renderedData.map(data => data.subject)
    };


    return (
      <Card fluid>
        
          {!this.props.isStudent ? <Segment><Dropdown onChange={this.handleSelect} 
                    name="studentFilter"
                    search 
                    selection 
                    closeOnChange={true}
                    value={this.state.studentFilter} 
                    options={studentOptions}/></Segment> : null}
        
        <Card.Content>
          <Polar
                data={data}
                width={100}
                height={500}
                options={{
                  maintainAspectRatio: false,
                  scale: {
                  ticks: {
                      suggestedMax: 100
                        }
                    }
                      }}
              />

            </Card.Content>
      </Card>
    );
  }
};

export default PolarChart