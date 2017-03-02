import React from 'react';
import { Button, Col, Grid, Jumbotron, Row } from 'react-bootstrap';
import './style.css';
import * as requests from '../../utils/requests';

export default class UserProfilePage extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      currentUserId: null,
      currentUserName: null,

      id: null,
      username: null,
      email: null,
      is_superuser: null,
      followers_users: [],
      following_users: [],
    };
  }

  componentDidMount() {
    this.loadData(this.props.params['username']);
  };

  async loadData(username) {
    const data = await requests.fetchUserData(username);

    this.setState({
      ...data
    });

    const currentUser = document.getElementById('id_current_user');
    const currentUserName = currentUser ? currentUser.getAttribute('data-current-username') : null;
    const currentUserId = currentUser ? parseInt(currentUser.getAttribute('data-current-userid'), 10) : null;

    this.setState({
      currentUserId,
      currentUserName,
    });
  };

  toggleFollow(targetUserId, followerId) {
    requests.toggleFollow(targetUserId, followerId, () => this.loadData(this.props.params['username']));
  }

  getFollowBtn() {
    if (!this.state.username || this.state.currentUserName === this.state.username) return null;

    //An instance of `Follower` model
    const followedByMe = this.state.followers_users.filter((follower) => {
      return follower.owner.indexOf(`api/users/${this.state.currentUserId}/`) > -1
    });

    return (
      <Button className="UserProfilePage-btn"
              bsStyle={'primary'}
              onClick={this.toggleFollow.bind(this, this.state.id, followedByMe.length ? followedByMe[0].id : null)}
      >
        {followedByMe.length ? 'Unfollow' : 'Follow'}
      </Button>
    )
  }

  render() {
    const isOwnerOrAdmin = this.state.is_superuser || (this.state.currentUserId && this.state.currentUserId === this.state.id);

    return (
      <Grid>
        <Row>
          <Col md={3}>
            <Jumbotron className="UserProfilePage-jumbotron">
              <p className="UserProfilePage-smile text-center">😃</p>
            </Jumbotron>
          </Col>

          <Col md={1}>
          </Col>

          <Col md={8}>
            <Jumbotron className="UserProfilePage-jumbotron">

              <Row>
                <Col md={6}>
                  <ul className="UserProfilePage-menu">
                    <li>👤 {this.state.username}</li>
                    <li>✉️️ {this.state.email}</li>
                    <li>☎️ -/-</li>
                    <li><b><span className="UserProfilePage-green">UserID: {this.state.id}</span></b></li>
                    <li>Following count: {this.state.following_users.length}</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="UserProfilePage-menu">
                    <li>📅 -/-</li>
                    <li>🌎 -/-</li>
                    <li>📍 -/-</li>
                    <li>
                      <a href="#">
                        <b><span className="UserProfilePage-green">Manage payment details</span></b>
                      </a>
                    </li>
                    <li>Followers count: {this.state.followers_users.length}</li>
                  </ul>
                </Col>
              </Row>

            </Jumbotron>
          </Col>
        </Row>

        <Row className="UserProfilePage-buttons">
          <Col md={6} mdOffset={3}>
            <div className="text-center">

              {this.getFollowBtn()}

              {isOwnerOrAdmin &&
              <Button className="UserProfilePage-btn"
                      bsStyle={'default'}
                      onClick={() => this.setSection('favorites')}
              >
                EDIT
              </Button>}

              {isOwnerOrAdmin &&
              <Button className="UserProfilePage-btn"
                      bsStyle={'warning'}
                      onClick={() => this.setSection('for_you')}
              >DELETE
              </Button>}

            </div>

          </Col>
        </Row>

      </Grid>
    );
  }
}
