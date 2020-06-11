import React, { Component } from "react";
//import NavComp from "../../component/NavComp";
import Footer from "../../component/footer"
//import Fade from 'react-reveal/Fade';
import '../../buttons.scss';
//import './index.scss';
import SimpleNav from "../../component/simpleNav";


export default class About extends Component {
	state = {};
	// constructor(props){
		
	// 	super(props);
	// }
	
	render() {
		//console.log(res.session);
		return (
			<div className="text-privacy">
				<SimpleNav />
				<div align="left" className="privacy-background about-content">
				<div>
					<div>
						<h3 className="text">What is Pocket Calendar all about?</h3>
						<p>Pocket calendar is built to help those people who often bookmark items to their pocket account and may forget to checkout these items again.</p>
						<p>This WebApp schedules unread items from the users' pocket account to his/her Google Calendar so that they can check them out their own convenience!</p>
						<p>A small bunch of articles are scheduled everyday for you, based on your preferred daily reading time.</p>
					</div>
				</div>
				<div className>
					<div>
						<h3 className="text">Signing up is just 4 steps away...</h3>
						<p>1. Sign up with your Google account</p>
						<p>2. Grant restricted access to your Google calendar</p>
						<p>3. Grant restricted access to your Pocket account</p>
						<p>4. Save your preferences: daily reading time, time to Schedule articles and your Time Zone</p>
					</div>
					<br/>
					<p>For more clarity on what data is collected and how it is used, read the <a href="/privacy-policy">Privacy policy</a></p>
					<br/>
					{/* <a href="#top" className="text"> ^ Scroll to top</a> */}
				</div>
				</div>
				<Footer />
			</div>
			
		);
	}
}