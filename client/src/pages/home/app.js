import React, {Component} from "react";
//import Footer from "component/footer"

import { Form, FormGroup, Slider, FormSelect, Modal, ModalBody, ModalHeader } from "shards-react";

import {Timepicker} from 'react-timepicker';
import 'react-timepicker/timepicker.css';
import '../../buttons.scss';
import './index.scss';

import Pulse from 'react-reveal/Pulse';

//const showSecond = false;
//const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

export default class App extends Component {
	timeRead = 20;
	timeHours = 16;
	timeMins = 0;
	loaded = false;
	loadEv = false;
	constructor(props) {
		super(props);
		this.handleSlide = this.handleSlide.bind(this);
		this.timeRead = this.props.timeDailyRead;
		let tmp = this.props.timeToSchedule.split(":");
		this.timeHours = parseInt(tmp[0]);
		this.timeMins = parseInt(tmp[1]);
		this.state = { timeRead: this.timeRead, Hours: this.timeHours, Mins: this.timeMins, timeZone: this.props.timeZone, open: false };
		//console.log(this.state);
	  }


	//   onChange(value) {
	// 	  console.log(value && value.format(str));
	//   }
	  componentDidMount(){
		  //console.log(this.props.prefSaved);
		if(this.props.pocketExists && this.props.googleExists){
			var s = document.getElementById("select-timezone");
			this.loaded = false;
			//this.loadEv = false;
			//console.log(s.options.length);
			for ( var i = 0; i < s.options.length; i++ ) {

				if ( s.options[i].text === this.props.tim ) {
		
					s.options[i].selected = true;
		
					break;
		
				} 
			//document.getElementById("select-timezone").value = this.props.timeZone;

			}
			//console.log("Load complete");
			this.loaded = true;
			document.getElementById("select-timezone").value = this.props.timeZone;
			if((this.props.pocketOffset > 0)){
				
				document.getElementById("stats-heading").innerText = "Your Pocket stats: ";
				document.getElementById("pocket-data").innerText = `Delivered items: ${this.props.pocketOffset}\n Unread items: ${this.props.totalUnread}`;

				if(/*(this.props.pocketOffset === this.props.totalUnread) ||*/ (this.props.totalUnread === 0)){
					document.getElementById("no-new-pocket-articles").innerText = "There are no new articles to deliver! Do add new articles to your Pocket!";
				}
				
			}
			else{
				document.getElementById("stats-heading").innerText = 'New users! Make sure you click on "Save Preferences", otherwise articles cannot be delivered to you! \n Old user? Maybe there are no unread items for you!';
			}
		}
	  }

	  handleSlide(e) {
		// this.setState({
		//   value: parseInt(e[0])
		// });
		this.timeRead = parseInt(e[0]);
		// this.setState({
		// 	timeRead: this.timeRead,
		// 	Hours: this.state.Hours, 
		// 	Mins: this.state.Mins
		// });
		this.setState(prevState => {
			return {
				timeRead: parseInt(e[0])
			};
		});
		//document.getElementById("select-timezone").value = this.props.timeZone;
		//this.state['timeRead'] = this.timeRead;
	  }

	  handleSelectChange = () => {
		  	//console.log(this.value);
			//var x = 
			// this.setState({
			// 	timeZone: document.getElementById("select-timezone").value
			// });
			//console.log('Value Selected: ', this.state);
			if(this.loaded === false){
				//console.log("Loading...");
			}
			else{
				//console.log("loaded");
			// 	this.setState({
			// 	timeZone: document.getElementById("select-timezone").value
			// });
			
			if(this.loadEv === false){
				document.getElementById("select-timezone").value = this.props.timeZone;
				//console.log("Now setting true...");
				this.loadEv = true;
				this.loaded = true;
			}
			else{
				//console.log("value: ", document.getElementById("select-timezone").value);
				this.setState({
					timeZone: document.getElementById("select-timezone").value
				})
				
				
					//document.getElementById("select-timezone").value = this.props.timeZone;
			}
			//console.log('Value Selected: ', this.state);
		}

	  }

	  disp(){
		  //console.log("submitted: ");
	  }

	  onTimeChange(options) {
		// do something
	  }
	
	  onFocusChange(focusStatue) {
		// do something
	  }

	  toggle = () => {
		this.setState({
		  open: !this.state.open
		});
	  }
	  
	  resetModal = () => {
		this.setState({
			open: !this.state.open
		});
		this.props.resetPrefModal();
	  }

	  toDate(dStr,format) {
		var now = new Date();
		if (format === "h:m") {
			now.setHours(dStr.substr(0,dStr.indexOf(":")));
			now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
			now.setSeconds(0);
			return now;
		}else 
			return "Invalid Format";
      }

	  //used arrow functions, so no need to bind in constructor
	  onChange = (hours, minutes) => {    
		//console.log(`${hours}, ${minutes}`);
		//console.log((Object.keys(this.props.loggedPocket).length !== 0), (this.props.pocketExists));
		//document.getElementById("select-timezone").value = this.props.timeZone;
		//console.log('Value Selected: ', document.getElementById("select-timezone").value);
		// var a = this.props.timeToSchedule;
		// var b = toDate(a,"h:m")
		// console.log(b);
		
		this.setState(prevState => {
			return {
				Hours: hours,
				Mins: minutes
			};
		});
		// this.setState({
		// 	timeRead: this.timeRead,
		// 	timeHours: hours, 
		// 	timeMins: minutes
		// });
		//this.timeHours = hours;
		// this.timeMins = parseInt(minutes[0]);
	  }
	//   prefSaved(){
	// 	  console.log(this.state);
	//   }

	checkInitPocketLogin(a){
		//console.log(a);
		if(a !== {} || (this.props.pocketExists)){
			//this.props.pocketExists = true;
			return true;
		}
		else{
			return false;
		}
	}

	render() {
		const { open } = this.state;
		return (
			(this.props.googleExists)
			? ((Object.keys(this.props.loggedPocket).length !== 0) || (this.props.pocketExists))
			? <div className="home-user">
				{/* <NavComp 
					onSignOutClick={this.props.onSignOutClick}
				/> */}
				<Modal open={open} toggle={this.toggle}>
					<ModalHeader>Your preferences are being saved... ⌛</ModalHeader>
				</Modal>
				<Modal open={this.props.prefSaved} toggle={this.resetModal}>
					<ModalHeader>Your preferences have been saved successfully! 🚀</ModalHeader>
				</Modal>
				{/* <Pulse cascade> */}
				<div align="center">
				<br/>
				<Pulse big>
					
					<h5 className="text-user">Edit your preferences: </h5>
				</Pulse>
				<Form center="true">
					<FormGroup className="col-md-6">
						<label className="col-form-label">Amount of time you want to read daily: </label>
						<div>
							<p>Minutes: {this.state.timeRead}</p>
							<Slider
							onSlide={this.handleSlide}
							connect={[true, false]}
							start={[this.state.timeRead]}
							range={{ min: 5, max: 60 }}
							/>
						</div>
					</FormGroup>
					<FormGroup className="col-md-6">
					<label className="col-form-label">Time at which you want your pocket bookmarks to be delivered daily: </label>
						<Timepicker hours={this.toDate(this.props.timeToSchedule,"h:m").getHours()} minutes={this.toDate(this.props.timeToSchedule,"h:m").getMinutes()} onChange={this.onChange} />
						
						
						<label className="col-form-label">Select your timezone: </label>
						
						<br/>
						<FormSelect id="select-timezone" className="col-md-6" onClick={this.handleSelectChange}>
							
							<option value="-10:00">(GMT-10:00) "Pacific/Honolulu": " Hawaii Time",</option>

							<option value="-09:00">(GMT-09:00) "America/Anchorage": "Alaska Time","Pacific/Gambier,</option>

							<option value="-08:00"> (GMT-08:00) "America/Los_Angeles": "Pacific Time","America/Vancouver": "Pacific Time - Vancouver",</option>

							<option value="-07:00">(GMT-07:00) "America/Dawson_Creek": "Mountain Time - Dawson Creek","America/Denver": "Mountain Time","America/Phoenix": "Mountain Time - Arizona",</option>

							<option value="-06:00">(GMT-06:00) "America/Chicago": "Central Time","America/Costa_Rica","America/El_Salvador","America/Mexico_City": "Central Time - Mexico City","America/Winnipeg": "Central Time - Winnipeg",</option>

							<option value="-05:00">(GMT-05:00) "America/Cayman"","America/Havana"","America/Iqaluit": "Eastern Time - Iqaluit","America/Jamaica","America/Lima","America/New_York": "Eastern Time","America/Panama","America/Toronto": "Eastern Time - Toronto","Pacific/Easter": "Easter Island",</option>

							<option value="-04:30">(GMT-04:30) "America/Caracas",</option>
							
							<option value="-04:00"> (GMT-04:00) "America/Barbados","America/Boa_Vista","America/Guyana","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Santo_Domingo","Atlantic/Bermuda",</option>

							<option value="-03:30">(GMT-03:30) "America/St_Johns": " Newfoundland Time - St. Johns",</option>

							<option value="-03:00">(GMT-03:00) "America/Argentina/Buenos_Aires","Atlantic/Stanley",</option>

							<option value="-02:00">(GMT-02:00) "America/Noronha","America/Sao_Paulo","Atlantic/South_Georgia",</option>

							<option value="-01:00"> (GMT-01:00) "America/Scoresbysund","Atlantic/Azores","Atlantic/Cape_Verde",</option>

							<option value="+00:00">(GMT+00:00) "Europe/Dublin,"Europe/Lisbon,"Europe/London,</option>

							<option value="+01:00">(GMT+01:00) "Europe/Amsterdam","Europe/Berlin","Europe/Brussels","Europe/Budapest","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Monaco","Europe/Oslo","Europe/Paris,"Europe/Prague","Europe/Rome","Europe/Stockholm","Europe/Tirane","Europe/Vienna","Europe/Warsaw","Europe/Zurich",</option>

							<option value="+02:00">(GMT+02:00) "Africa/Cairo","Africa/Johannesburg","Asia/Jerusalem","Europe/Athens","Europe/Bucharest","Europe/Istanbul",</option>

							<option value="+03:00">"(GMT+03:00) Africa/Nairobi","Asia/Baghdad","Asia/Qatar","Asia/Riyadh,"Europe/Moscow",</option>

							<option value="+03:30">(GMT+03:30) "Asia/Tehran,</option>

							<option value="+04:00">(GMT+04:00) "Asia/Dubai","Indian/Mauritius",</option>

							<option value="+04:30"> (GMT+04:30) "Asia/Kabul",</option>

							<option value="+05:00">(GMT+05:00) "Asia/Karachi","Indian/Maldives",</option>

							<option value="+05:30">(GMT+05:30) "Asia/Calcutta": " India Standard Time","Asia/Colombo",</option>

							<option value="+05:45">(GMT+05:45) "Asia/Katmandu"</option>

							<option value="+06:00">(GMT+06:00) "Asia/Dhaka","Asia/Thimphu",</option>

							<option value="+07:00">(GMT+07:00) "Asia/Bangkok","Asia/Jakarta",</option>

							<option value="+08:00">(GMT+08:00) "Asia/Hong_Kong","Asia/Kuala_Lumpur","Asia/Macau","Asia/Manila","Asia/Shanghai": "China Time - Beijing","Asia/Singapore,"Asia/Taipei","Australia/Perth": "Western Time - Perth",</option>

							<option value="+08:30">(GMT+08:30) "Asia/Pyongyang",</option>

							<option value="+09:00">(GMT+09:00) "Asia/Seoul","Asia/Tokyo","Asia/Yakutsk","Pacific/Palau",</option>

							<option value="+09:30">(GMT+09:30) "Australia/Darwin": "Central Time - Darwin",</option>

							<option value="+10:00">(GMT+10:00)"Australia/Brisbane": "Eastern Time - Brisbane",</option>

							<option value="+10:30">(GMT+10:30) "Australia/Adelaide": " Central Time - Adelaide",</option>

							<option value="+11:00">(GMT+11:00) "Australia/Hobart": " Eastern Time - Hobart","Australia/Sydney": "Eastern Time - Melbourne, Sydney",</option>

							<option value="+12:00">(GMT+12:00) "Asia/Kamchatka": " Moscow+09 - Petropavlovsk-Kamchatskiy",</option>

							<option value="+13:00">(GMT+13:00) "Pacific/Auckland": " Auckland","Pacific/Fiji",</option>

						</FormSelect>
						<br/>
						<label className="col-form-label">Current saved timezone in the database is: GMT{this.props.timeZone}</label><br/>
						<label className="col-form-label">For new accounts timezone saved is: +05:30 (Indian Standard Time) by default.</label>
					</FormGroup>
					<button type="button" className="btn btn-primary" onClick={e => {this.setState({timeZone: document.getElementById("select-timezone").value}); console.log(this.state); this.toggle(); this.props.onButtonClick(e, this.state)}}>Save Preferences</button>
					<br/>
					
				</Form>
				
				</div>
				
				{/* </Pulse> */}
				<br/>
				<div align="center">
					<h6 id="stats-heading" className="text-user"></h6>
					<h6 id="no-new-pocket-articles" className="text-warning"></h6>
					<p id="pocket-data" className="text-user"></p>
				</div>
				<br/>
				<br/>
			</div>
			: <div className="home-user">
				{/* <NavComp /> */}
				<Pulse cascade>
				<div align="center">
					<Pulse big>
					<h1 className="text-user">Please connect your Pocket account</h1>
					</Pulse>
					{/* <button onClick={e => this.props.onPocketButtonClick()}>Connect to Pocket</button> */}
					<div className="pocket-btn" onClick={e => this.props.onPocketButtonClick()}>
						<div className="pocket-icon-wrapper">
							<img className="pocket-icon" src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_getpocket-512.png" alt="pocket-logo"/>
						</div>
						<p className="btn-text"><b>Pocket</b></p>
					</div>
					<p className="text-user">For more clarity on what data is collected and how it is used, read the <a href="/privacy-policy">Privacy policy</a></p>
				</div>
				</Pulse>
			</div>
			: <div className="home-user">
				{/* <NavComp /> */}
				<Pulse cascade>
				<div align="center">
					<Pulse big>
						<br/>
						<h1 className="text-user">Give access to your google calendar</h1>
						
					</Pulse>
					{/* <button onClick={e => this.props.onGoogleCalClick()}>Google calendar</button> */}
					<Pulse big>
					<div className="google-btn" onClick={e => this.props.onGoogleCalClick()}>
						<div className="google-icon-wrapper">
							<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Google_Calendar_icon.svg" alt="calendar-logo"/>
						</div>
						<p className="btn-text"><b>Google Calendar</b></p>	
					</div>
					<br/>
					<h6 className="text-user">*Alert: Make sure you select the same google account you used to signup for this service!*</h6>
					<p className="text-user">For more clarity on what data is collected and how it is used, read the <a href="/privacy-policy">Privacy policy</a></p>
					{/* <h6 className="text-user">*If any problem persists, click on the profile icon to unsubscribe and signup again for the service*</h6> */}
					</Pulse>
				</div>
				</Pulse>
			</div>
		);
	}
}


