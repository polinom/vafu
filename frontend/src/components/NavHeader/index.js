import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './style.css';

export default class NavHeader extends React.Component {

  getVisibleItems(user) {
    if (user) {
      return [
        <NavItem key="1" href="#"> <span>👥</span> </NavItem>,
        <NavItem key="2" href="#"> <span>✉️️</span> </NavItem>,

        <NavItem
          key="3"
          id="id_current_user"
          data-current-username={user.username}
          data-current-userid={user.id}
          onClick={() => window.location.pathname = `/users/${user.username}/`}
          href={`/users/${user.username}/`}
        >
          <span>😃</span> <b>{`${user.username}`}</b>
        </NavItem>,

        <NavItem
          key="4"
          onClick={() => window.location.pathname = '/accounts/logout/'}
          href="/accounts/logout/"
        >
          Sign Out
        </NavItem>,
      ]

    } else {
      return [
        <NavItem
          key="1"
          onClick={() => window.location.pathname = '/accounts/login/'}
          href="/accounts/login/"
        >
          Log In
        </NavItem>,

        <NavItem
          key="2"
          onClick={() => window.location.pathname = '/accounts/signup/'}
          href="/accounts/signup/"
        >
          Sign Up
        </NavItem>,
      ]
    }
  }

  render() {
    const { user } = this.props;
    const visibleItems = this.getVisibleItems(user);

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Vacation Fund</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <div className="navbar-inner center">
            <Nav>
              <NavItem href="#">COUNTDOWN</NavItem>
              <NavItem onClick={() => window.location.pathname = '/goals/'} href="/goals/">GOALS</NavItem>
              <NavItem onClick={() => window.location.pathname = '/deals/'} href="/deals/">DEALS</NavItem>
            </Nav>
          </div>

          <Nav pullRight>
            {visibleItems}
          </Nav>
        </Navbar>
      </div>
    )
  }
}
