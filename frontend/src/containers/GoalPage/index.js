import React from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Base from '../../containers/Base';
import GoalCard from '../../components/GoalCard';
import './style.css';
import * as requests from '../../utils/requests';

export default class GoalPage extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      section: 'My Goals',
      goals: []
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

  render() {
    const goals = this.state.goals.map((goal) => {
        return (
          <GoalCard
            key={goal.id} {...goal}
          />
        )
      }
    );

    const newGoalButton = goals.length ? null : (
        <div className="text-center">
          <ButtonGroup className="GoalPage-btn-group">
            <Button>Create a Goal</Button>
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