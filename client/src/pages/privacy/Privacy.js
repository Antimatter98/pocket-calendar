import React, { Component } from "react";
//import NavComp from "../../component/NavComp";
import Footer from "../../component/footer"
//import Fade from 'react-reveal/Fade';
import '../../buttons.scss';
//import './index.scss';
import SimpleNav from "../../component/simpleNav";

export default class Privacy extends Component {
	state = {};
	// constructor(props){
		
	// 	super(props);
	// }
	
	render() {
		//console.log(res.session);
		return (
			<div  className="text-privacy">
				<SimpleNav />
				<div align="left" className="privacy-background">
				<h1 className="text-privacy">Privacy Policy</h1>
				<p className="text-privacy">Pocket Calendar is a WebApp created by Nishant Tilve, the contact details can be found at the end of this page. This service is free and is intended for use as is.
				If you choose to use this service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy. </p>
				<br/>
				<h3 className="text-privacy">Information Collection and Use</h3>
				<p>To provide the user a better experience, it is required that the user provides certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy. </p>
				<p>The app does use third party services that may collect information used to identify you.</p>
				<p>Link to privacy policy of third party service providers used by the app: </p>
				<ul>
					<li><a href="https://firebase.google.com/support/privacy">Firebase</a></li>
					<li><a href="https://firebase.google.com/policies/analytics">Google Analytics for Firebase</a></li>
					<li><a href="https://devcenter.heroku.com/articles/security-privacy-compliance">Heroku</a></li>
				</ul>
				<br/>
				<h3 className="text-privacy">Information you provide to this service and how it is used</h3>
				<ul>
					<li>
						<h6 className="text-privacy">Your Google account information:</h6>
						<p className="text-privacy">You provide your google account information such as your E-mail, your name and your google profile photo to create an account for you to use this service and is used to uniquely identify the users of this service. Your name and Profile photo are displayed in WebApp to help you identify the connected account. This data is in no way used for any other purpose.
						</p>
					</li>
					<li>
						<h6 className="text-privacy">Access to your Google Calendar events and your 'primary'(default) Google Calendar:</h6>
						<p className="text-privacy">You provide access to your Google Calendar events and your 'primary' (default) Google Calendar so that the service knows at what time you are free everyday based on your calendar events and articles from your Pocket account are scheduled to your calendar accordingly. This service only accesses the events from your 'primary' (default) calendar. This service will not delete any existing events from your google calendar. This service schedules articles for you on a daily basis (once a day), so only the events for that particular day are accessed from your google calendar to check when you are free. Data related to your calendar events is discarded from the servers as soon as this processing is over (which generally takes a few minutes daily) and is in no way used for any other purpose.
						</p>
					</li>
					<li>
						<h6 className="text-privacy">Access to your Pocket Account:</h6>
						<p className="text-privacy">You provide access to your Pocket Account so that the service can check what and how many articles are unread. No article from your Pocket account is deleted by this service. This service will only modify those articles which are scheduled to your google calendar by adding tagging them as scheduled. Other data used by this service is the numerical data related to how many articles are scheduled and total unread articles and is in no way used for any other purpose.
						</p>
					</li>
					<li>
						<h6 className="text-privacy">Your area's time zone:</h6>
						<p className="text-privacy">You provide the time zone of the area you live in by selecting from a list of timezones so that the service can schedule articles for you according to your timezone. This data is in no way used for other purpose.
						</p>
					</li>
				</ul>
				<br/>
				<h3 className="text-privacy">Service providers</h3>
				<p>Some third-party providers listed above are employed due to the following reasons:</p>
				<ul className="text-privacy">
					<li>To facilitate our Service</li>
					<li>To provide the Service on our behalf</li>
					<li>To perform Service-related services</li>
				</ul>
				<p>Users of this service are informed that these third party services have access to some or all of your Personal information only that is collected by this service (what information is collected is already listed above). The reason is to perform the tasks assigned to them. However, they are obligated not to disclose or use the information for any other purpose.
				</p>
				<br/>
				<h3 className="text-privacy">Cookies</h3>
				<p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
				</p>
				<p>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this service.
				</p>
				<br/>
				<h3 className="text-privacy">Security</h3>
				<p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security. 
				</p>
				<br/>
				<h3 className="text-privacy">Links to other sites</h3>
				<p>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, it us strongly advised that you to review the Privacy Policy of these websites. we have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. 
				</p>
				<br/>
				<h3 className="text-privacy">Revoke Access</h3>
				<p>If you decide to revoke access of the App to your Google Account you may use “3rd Party Access” page of your Google Account located at https://security.google.com/settings/security/permissions. Doing this you won't be able to use this service. You can always signup for this service again by unsubscribing from this service first.
				</p>
				<br/>
				<h3 className="text-privacy">Changes to this privacy policy</h3>
				<p>This privacy policy may be updated from time to time. It is advisable to consult this document from time to time so that you are aware of these changes.
				</p>
				<br/>
				<h3 className="text-privacy">Contact Details</h3>
				<p>If you have any questions or suggestions, feel free to contact <a href="mailto:nishanttilve@gmail.com">nishanttilve@gmail.com</a></p>
				</div>
				<Footer />
			</div>
			
		);
	}
}
