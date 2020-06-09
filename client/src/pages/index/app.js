import React, { Component } from "react";
import Footer from "../../component/footer"
import Fade from 'react-reveal/Fade';
import '../../buttons.scss';
import './index.scss';
import logo from './save-icon.png';

export default class App extends Component {
	state = {};
	// constructor(props){
		
	// 	super(props);
	// }
	
	render() {
		//console.log(res.session);
		return (
			(this.props.googleAuth)
			? <div align="center">
				<Fade bottom cascade>
				<div className="main index column is-8">
					<h1 className="title">Pocket Calendar</h1>
					<p>Your pocket bookmarks delivered straight to your google calendar</p>
					{/* <button onClick={e => this.props.onButtonClick(e, this.state)}> Connect To Google
					</button> */}
					<a href="/home"><button>Already logged in</button></a>
					<p>Redirecting...</p>
				</div>
				</Fade>
				<Footer />
			</div>
			: <div align="center">
				<Fade bottom cascade>
				<div className="home">
					<h1 className="title-top" id="top">Pocket</h1>
					<img className="logo-main" src={logo} alt="pocket-calendar-logo"/>
					<h1 className="title-down">Calendar</h1>
					<br/>
					<h6 className="text">Your pocket bookmarks delivered straight to your google calendar</h6>
					{/* <button onClick={e => this.props.onButtonClick(e, this.state)}>
        			</button> */}
					<div className="google-btn" onClick={e => this.props.onButtonClick(e, this.state)}>
						<div className="google-icon-wrapper">
							<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google-icon"/>
						</div>
						<p className="btn-text"><b>Sign in with Google</b></p>
					</div>
					<p className="link">By Signing up, you agree to the <a href="/privacy-policy" className="link"><u>Privacy Policy</u></a></p>
					<p className="cookie-text">Issues with signin or signup? Make sure 3rd party cookies are enabled in your browser.</p>
					<p className="cookie-text"><a href="/help" className="link-index"><u>For more help, click here</u></a></p>
					{/* <p className="text">Scroll Down for More Info</p> */}
					<div className="section"> </div>
					{/* <div></div> */}
				</div>
				<div className="home-details-1 text">
					<div className="content-data">
						<h3 className="text">What is Pocket Calendar all about?</h3>
						<p>Pocket calendar is built to help those people who often bookmark items to their pocket account and may forget to checkout these items again.</p>
						<p>This WebApp schedules unread items from the users' pocket account to his/her Google Calendar so that they can check them out their own convenience!</p>
						<p>A small bunch of articles are scheduled everyday for you, based on your preferred daily reading time.</p>
					</div>
				</div>
				<div className="home-details-2 text">
					<div className="content-data">
						<h3 className="text">Signing up is just 4 steps away...</h3>
						<p>1. Sign up with your Google account</p>
						<p>2. Grant restricted access to your Google calendar</p>
						<p>3. Grant restricted access to your Pocket account</p>
						<p>4. Save your preferences: daily reading time, time to Schedule articles and your Time Zone</p>
					</div>
					<br/>
					<p>For more clarity on what data is collected and how it is used, read the <a href="/privacy-policy" className="link-index"><u>Privacy policy</u></a></p>
					<br/>
					<p>So what are you waiting for? Sign up for Pocket Calendar now!</p>
					{/* <a href="#top" className="text"> ^ Scroll to top</a> */}
				</div>
				</Fade>
				<Footer />
			</div>
			
		);
	}
}
