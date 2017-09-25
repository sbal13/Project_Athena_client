import React from 'react'
import {Form} from 'semantic-ui-react'


const DashUserList = ({users, openDetails, resetDetails}) => {

	const handleClick = (event, data) => {
		openDetails(parseInt(event.target.name, 10))
	}

	const listedUsers = users.map((user,index) => <Form.Button onClick={handleClick} name={user.id} key={index}>{user.username}</Form.Button>)
	return(
		<Form>
			<Form.Button onClick={resetDetails}>reset</Form.Button>
			{listedUsers}
		</Form>
	)
}

export default DashUserList