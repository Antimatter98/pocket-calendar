import React, { Component } from "react";

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse
} from "shards-react";

import logo from "./save-icon.png";

export default class SimpleNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  };

  toggleNavbar = () => {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  };

  render() {
    return (
      <Navbar type="dark" theme="dark" expand="md" full>
        <NavbarBrand href="/">
          <img className="mr-2" src={logo} alt="" height="30" /> Pocket Calendar
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse open={this.state.collapseOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <button type="button" class="btn btn-dark">
                <NavLink href="/">
                  <p className="text-nav">Home</p>
                </NavLink>
              </button>
            </NavItem>
            <NavItem>
              <button type="button" class="btn btn-dark">
                <NavLink href="/about">
                  <p className="text-nav">About</p>
                </NavLink>
              </button>
            </NavItem>
            <NavItem>
              <button type="button" class="btn btn-dark">
                <NavLink href="/help">
                  <p className="text-nav">Help</p>
                </NavLink>
              </button>
            </NavItem>
            <NavItem>
              <button type="button" class="btn btn-dark">
                <NavLink href="/privacy-policy">
                  <p className="text-nav">Privacy Policy</p>
                </NavLink>
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
