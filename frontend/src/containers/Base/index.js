import React from 'react';
import './style.css';
import NavHeader from '../../components/NavHeader';
import { fetchCurrentUser } from '../../utils/requests';

export default class Base extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.loadUserData();
  };

  async loadUserData() {
    this.setState({
      user: await fetchCurrentUser()
    });
  };

  getUser() {
    try {
      return this.state.user.username ? this.state.user : undefined;
    } catch (e) {
    }
  }

  getChildren() {
    if (this.props.location) {
      return React.cloneElement(this.props.children, { key: this.props.location.pathname });
    } else {
      return this.props.children;
    }
  }

  render() {
    const user = this.getUser();
    const children = this.getChildren();

    return (
      <div>
        <NavHeader user={user}/>

        {children}
      </div>
    )
  }
}
