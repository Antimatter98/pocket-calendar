import React, { Component } from "react";
import logo from "./save-icon.png";

//import "./style.css";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "shards-react";

//import logo from "src/pages/react-multi.png"

export default class NavComp extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen,
      },
    });
    //console.log('"' + this.props.userPhoto + '"');
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen,
      },
    });
  }

  //let imgURL = this.props.user.photoURL;
  render() {
    return (
      <Navbar type="dark" theme="dark" expand="md">
        <NavbarBrand href="/">
          <img className="mr-2" src={logo} alt="" height="30" /> Pocket Calendar
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav className="ml-auto" navbar>
            <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle nav caret>
                {/* <img class="circular--square" src="${this.props.user.photoURL}" /> */}
                <img
                  className="circular--square"
                  src={this.props.loggedUser.photoURL.toString()}
                  alt="Profile"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Signed in as: <br /> {this.props.loggedUser.displayName}
                </DropdownItem>
                {/* <button type="button" class="btn btn-light" onClick={e => this.props.onUnsubscribeClick(e)}><DropdownItem>Unsubscribe from<br/>Pocket Calendar</DropdownItem></button> */}
                <DropdownItem onClick={(e) => this.props.onUnsubscribeClick(e)}>
                  Unsubscribe from
                  <br />
                  Pocket Calendar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <button type="button" className="btn btn-dark">
                <NavLink href="/help">
                  <p className="text-nav">Help</p>
                </NavLink>
              </button>
            </NavItem>
            <NavItem>
              <button type="button" className="btn btn-dark">
                <NavLink href="/about">
                  <p className="text-nav">About</p>
                </NavLink>
              </button>
            </NavItem>
            <NavItem>
              <button
                type="button"
                className="btn btn-dark"
                onClick={(e) => this.props.onSignOutClick(e)}
              >
                <NavLink href="#">
                  <p className="text-nav">Sign Out</p>
                </NavLink>
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
