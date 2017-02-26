import React from 'react';
import './style.css';
import { Modal, Button, Form, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import FieldGroup from '../FieldGroup';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as requests from '../../utils/requests';

export default class EditGoal extends React.PureComponent {
  constructor() {
    super();

    moment.locale(window.navigator.userLanguage || window.navigator.language);

    this.initialState = {
      travel_date: moment(),
      id: null,
      title: '',
      image: '',
      description: '',
      budget_estimate: null,
      funding_progress: null,
    };

    this.state = this.initialState;
  }

  componentWillReceiveProps(nextProps) {
    let travel_date = moment((nextProps.goal || {}).travel_date);
    if (!travel_date.isValid()) travel_date = moment();

    let nextState = {
      ...this.initialState,
    };

    if (nextProps.goal) nextState = {
      ...nextProps.goal,
    };

    nextState = {
      ...nextState,
      travel_date
    };

    this.setState(nextState);
  }

  handleDateChange = (date) => {
    this.setState({ travel_date: date, });
  };

  handleFormChange = (e) => {
    const key = e.target.id.replace(/^id_/, '');

    this.setState(
      { [key]: e.target.value }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ error: null });

    this.postGoalsData(this.state.id, this.state)
  };

  postGoalsData(goalId, data) {
    requests.postGoalsData(goalId, data, this.handleSubmitError, () => {
      if (this.state.error) return;

      this.props.onHide();
      this.props.reloadGoals();
    });

  };

  handleSubmitError = ({ data: error }) => {
    this.setState({ error });
  };

  getError() {
    try {
      return this.state.error.non_field_errors || this.state.error.detail;
    } catch (e) {
    }
  }

  getValidationError(id) {
    const key = id.replace(/^id_/, '');

    try {
      return this.state.error[key][0]
    } catch (e) {
    }
  }

  clearAndClose = () => {
    this.setState({ error: null });
    this.props.onHide();
  };

  render() {
    const { goal, show } = this.props;
    const title = goal ? 'Edit existing goal' : 'Create a new goal';
    const formError = this.getError();

    return (
      <Modal show={show} onHide={this.clearAndClose}>

        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>

            {formError && <Alert bsStyle="danger">{formError}</Alert>}

            <FieldGroup
              id="id_title"
              error={this.getValidationError("id_title")}
              value={this.state.title || ''}
              type="text"
              label="Title"
              placeholder="Enter title"
              onChange={this.handleFormChange}
            />

            <FieldGroup
              id="id_image"
              error={this.getValidationError("id_image")}
              value={this.state.image || ''}
              type="text"
              label="Image URL"
              placeholder="Enter image URL"
              onChange={this.handleFormChange}
            />

            <FormGroup controlId="id_description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.description || ''}
                placeholder="Enter description"
                onChange={this.handleFormChange}
              />
            </FormGroup>

            <FieldGroup
              id="id_budget_estimate"
              error={this.getValidationError("id_budget_estimate")}
              value={this.state.budget_estimate || ''}
              type="number"
              label="Budget estimate"
              placeholder="Enter estimated budget $"
              onChange={this.handleFormChange}
            />

            <FieldGroup
              id="id_funding_progress"
              error={this.getValidationError("id_funding_progress")}
              value={this.state.funding_progress || ''}
              type="number"
              label="Funding Progress"
              placeholder="Enter funding progress $"
              onChange={this.handleFormChange}
            />

            <FormGroup>
              <ControlLabel>Travel date</ControlLabel>
              <br />
              <DatePicker
                selected={moment(this.state.travel_date) || moment()}
                onChange={this.handleDateChange}
              />
            </FormGroup>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.clearAndClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit} type="submit">Save changes</Button>
          </Modal.Footer>

        </Form>
      </Modal>
    )
  }
}
