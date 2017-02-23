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

  render() {
    const user = this.getUser();

    return (
      <div>
        <NavHeader user={user}/>

        {this.props.children}
      </div>
    )
  }
}
