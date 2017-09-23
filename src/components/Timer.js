import React from 'react'
import {Card} from 'semantic-ui-react'

const Timer = ({timeRemaining})=>{

	const formatDoubleDigit = (time)=>{
		if (time < 10) {
			time = `0${time}`
		}

		return time
	}

	const seconds = timeRemaining%60

	const totalMinutes = (timeRemaining-seconds)/60

	const minutes = totalMinutes%60

	const hours = (totalMinutes-minutes)/60



	const formattedTime = `${formatDoubleDigit(hours)}:${formatDoubleDigit(minutes)}:${formatDoubleDigit(seconds)}`


	const style = (minutes === 0 && hours === 0 && seconds < 30) ? {color: "red"} : {color: "black"}

	return (
		<Card>
			<Card.Content style = {style}><h3>Time Remaining: {formattedTime}</h3></Card.Content>
		</Card>
	)
}

export default Timer