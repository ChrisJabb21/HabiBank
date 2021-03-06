import React from "react";
import "./Header.css";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { updateLogInStatus } from "../../redux/actions/auth";
import { clearCustomer } from "../../redux/actions/customer";
import { withRouter, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  HEADER_GREETING,
  GUEST,
  NAV_HOME,
  NAV_PROFILE,
  NAV_LOG_IN,
  NAV_LOG_OUT,
} from "../../constants/index";
/**
 * Universal header when the user is logged in
 */
const Header = (props) => {
  const renderName = () => {
    const { loggedIn, profile } = props;
    let name = loggedIn ? profile.fullName : GUEST;

    return (
      <Navbar.Text>
        {HEADER_GREETING}
        <span className="navbar-name">{name}</span>
      </Navbar.Text>
    );
  };

  const handleLogOut = () => {
    const { loggedIn } = props;
    props.updateLogInStatus(!loggedIn);
    props.clearCustomer();
    props.history.push("/");
  };

  const handleProfile = () => {
    props.history.push("/profile");
  };

  const handleHome = () => {
    props.history.push("/home");
  };

  const handleLogIn = () => {
    props.history.push("/");
  };

  const renderLogo = () => {
    const { loggedIn } = props;
    let link = loggedIn ? "/home" : "";
    return (
      <Link to={link}>
        <Navbar.Brand href="">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Habi Bank logo"
          />
        </Navbar.Brand>
      </Link>
    );
  };
  const renderLinks = () => {
    const { loggedIn } = props;
    if (loggedIn) {
      return (
        <Nav>
          <Nav.Link href="" onClick={handleHome}>
            {NAV_HOME}
          </Nav.Link>
          <Nav.Link href="" onClick={handleProfile}>
            {NAV_PROFILE}
          </Nav.Link>
          <Nav.Link href="" onClick={handleLogOut}>
            {NAV_LOG_OUT}
          </Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link href="" onClick={handleLogIn}>
            {NAV_LOG_IN}
          </Nav.Link>
        </Nav>
      );
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        {renderLogo()}
        {renderName()}
        <Navbar.Collapse className="justify-content-end">
          {renderLinks()}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { customer, auth } = state;
  return {
    profile: customer.profile,
    userLoaded: customer.userLoaded,
    loggedIn: auth.loggedIn,
  };
};

const mapDispatchToProps = { updateLogInStatus, clearCustomer };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
