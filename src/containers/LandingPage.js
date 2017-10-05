import React from 'react'
import {Card, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const LandingPage = () => {

	const signupButton = <Link className="landing-page-button" to="/signup"><Button className="landing-page-button">sign up</Button></Link>
	const loginButton = <Link className="landing-page-button" to="/login"><Button className="landing-page-button" >log in</Button></Link>

	const page1 =
		 <div className="landing-page">
		 	<Image className="landing-page-image" size="massive" src="http://risingroads.com/wp/wp-content/uploads/2015/01/books4.jpg"/>
		 	{signupButton}
		 	{loginButton}
		 </div>


	const page2 =
		 <div className="landing-page">
		 	<Image className="landing-page-image" size="massive" src="https://i.amz.mshcdn.com/VhYesuG5It_sY9o228WWaPw-G10=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F539206%2F3310d58a-2b01-47db-a38a-e84a45987dd4.jpg
"/>
			{signupButton}
		 	{loginButton}
		 </div>

	const page3 =
		 <div className="landing-page">
		 	<Image className="landing-page-image" size="massive" src="http://i.huffpost.com/gen/1811926/images/o-BOOKS-facebook.jpg"/>
		 	{signupButton}
		 	{loginButton}
		 </div>

	const pages = [page1, page2, page3]

	return pages[Math.ceil(Math.random()*pages.length)-1]
}

export default LandingPage