import React, { Component } from "react";
//import NavComp from "../../component/NavComp";
import Footer from "../../component/footer"
//import Fade from 'react-reveal/Fade';
import '../../buttons.scss';
import './index.scss';
import SimpleNav from "../../component/simpleNav";


export default class App extends Component {
	state = {};
	// constructor(props){
		
	// 	super(props);
	// }
	
	render() {
		//console.log(res.session);
		return (
			<div className="text-privacy">
				<SimpleNav />
				<div align="left" className="help-background">
					<h1 className="text-privacy">Some error occured?</h1>
					<br/>
					<h3 className="text-privacy">Some commonly faced errors are listed here and how to tackle them: </h3>
					<br/>
					<ol>
						<li>
							<h6 className="text-privacy">Issues regarding Google calendar access</h6>
							<p>There is a chance you might have landed up on this page after trying to give access to your google calendar. This issue comes up at times and the solution to this at the moment is resubscribing to this service by following these steps: </p>
							<ol type="a">
								<li><strong>Make sure you selected the same google accounts for granting Google Calendar access and while signing up for this service! If you didn't do so, try this before proceeding to the next steps.</strong></li>
								<li>Unsubscribe from the service first by clicking on your profile icon and select "Unsubscribe from Pocket Calendar"</li>
								<li>(Note: this step is only applicable if you had previously subscribed to Pocket Calendar, unsubscribed later and forgot to "Remove access" to "Pocket Calendar" from your Google account's security settings) <a href="https://security.google.com/settings/security/permissions" target="_blank"><u>Go to your Google account's security page from here</u></a> and under "3rd party access" select Pocket-Calendar and click the "Remove access" button</li>
								<li>Now again subscribe to Pocket Calendar by signing up with your google account from the home page</li>
							</ol>
						</li>
						<br/>
						<br/>
						<li>
							<h6 className="text-privacy">Issues with signing in / signing up for the service</h6>
							<p>Make sure 3rd party cookies are enabled in your browser's settings. These are required to be enabled to make the 3rd party services we use run properly. Check out the <a href="/privacy-policy"><u>Privacy Policy</u></a></p>
						</li>
						<br/>
						<br/>
						<li>
							<h6 className="text-privacy">Issues with connecting your Pocket account</h6>
							<p>If you are accessing this service using a mobile phone, there is a chance you might get very limited signin options to your pocket account (such as sign in with email and password). Resolving this is upto https://getpocket.com . As of now, only options are:</p>
							<ol type="a">
								<li><strong>signing out</strong> of this service from your mobile device</li>
								<li><strong>signing in</strong> to this service from a PC</li>
								<li>Grant pocket access from PC</li>
								<li>Then to use the rest of the features on your mobile device, you can <strong>signout</strong> of this service from your PC and <strong>Sign in</strong> back to this service from your mobile device.</li>
								<li>Or you may continue using this service from your PC</li>
							</ol>
						</li>
					</ol>
				</div>
				<Footer />
			</div>
			
		);
	}
}
