import React from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Base from '../../containers/Base';
import GoalCard from '../../components/GoalCard';
import EditGoal from '../../components/EditGoal';
import './style.css';
import * as requests from '../../utils/requests';

export default class GoalPage extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      section: 'My Goals',
      goals: [],
      showModal: false,
      editedGoal: null,
    }
  }

  componentDidMount() {
    this.loadGoalsData(this.state.section);
  };

  async loadGoalsData(section) {
    this.setState({
      goals: await requests.fetchGoalsData(section)
    });
  };

  setSection(section) {
    this.setState({
      ...this.state,
      section
    });

    this.loadGoalsData(section);
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false,
      editedGoal: null,
    });
  };

  openModal = (goal) => {
    this.setState({
      ...this.state,
      showModal: true,
      editedGoal: goal,
    });
  };

  handleEditGoalClick = (goal) => {
    this.openModal(goal);
  };

  render() {
    const goals = this.state.goals.map((goal) => {
        return (
          <GoalCard
            key={goal.id}
            onEditGoalClick={this.handleEditGoalClick.bind(this, goal)}
            {...goal}
          />
        )
      }
    );

    const newGoalButton = (
      <div className="text-center">
        <ButtonGroup className="GoalPage-btn-group">
          <Button onClick={this.openModal.bind(this, null)}>Create a Goal</Button>
        </ButtonGroup>
      </div>
    );

    return (
      <Base>
        <Grid>
          <Row>
            <Col md={6} mdOffset={3}>
              <div className="text-center">

                <ButtonGroup className="GoalPage-btn-group">

                  <Button bsStyle={this.state.section === 'My Goals' ? 'info' : 'default'}
                          onClick={() => this.setSection('My Goals')}
                  >
                    My Goals
                  </Button>

                  <Button bsStyle={this.state.section === 'Shared' ? 'info' : 'default'}
                          onClick={() => this.setSection('Shared')}
                  >
                    Shared
                  </Button>

                  <Button bsStyle={this.state.section === 'Friends' ? 'info' : 'default'}
                          onClick={() => this.setSection('Friends')}
                  >Friends
                  </Button>

                </ButtonGroup>

                <EditGoal
                  goal={this.state.editedGoal}
                  show={this.state.showModal}
                  onHide={this.closeModal}
                  reloadGoals={this.loadGoalsData.bind(this, this.state.section)}
                />

              </div>

              {newGoalButton}
            </Col>
          </Row>

          <Row className="GoalPage-goals">
            {goals}
          </Row>
        </Grid>
      </Base>
    );
  }
}
