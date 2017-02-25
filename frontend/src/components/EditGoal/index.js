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

    this.state = {
      travel_date: moment()
    };
  }

  handleDateChange = (date) => {
    this.setState({
      travel_date: date
    });
  };

  handleFormChange = (e) => {
    const key = e.target.id.replace(/^id_/, '');

    this.setState(
      ...this.state,
      { [key]: e.target.value }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(
      ...this.state,
      { error: null }
    );

    this.postGoalsData(null, this.state)
  };

  postGoalsData(goalId, data) {
    requests.postGoalsData(goalId, data, this.handleSubmitError, () => {
      if (this.state.error) return;

      this.props.onHide();
      this.props.reloadGoals();
    });

  };

  handleSubmitError = ({ data: error }) => {
    this.setState(
      ...this.state,
      { error }
    );
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

        <Modal.Body>
          <Form>

            {formError && <Alert bsStyle="danger">{formError}</Alert>}

            <FieldGroup
              id="id_title"
              error={this.getValidationError("id_title")}
              type="text"
              label="Title"
              placeholder="Enter title"
              onChange={this.handleFormChange}
            />

            <FieldGroup
              id="id_image"
              error={this.getValidationError("id_image")}
              type="text"
              label="Image URL"
              placeholder="Enter image URL"
              onChange={this.handleFormChange}
            />

            <FormGroup controlId="id_description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter description"
                onChange={this.handleFormChange}
              />
            </FormGroup>

            <FieldGroup
              id="id_budget_estimate"
              error={this.getValidationError("id_budget_estimate")}
              type="number"
              label="Budget estimate"
              placeholder="Enter estimated budget $"
              onChange={this.handleFormChange}
            />

            <FieldGroup
              id="id_funding_progress"
              error={this.getValidationError("id_funding_progress")}
              type="number"
              label="Funding Progress"
              placeholder="Enter funding progress $"
              onChange={this.handleFormChange}
            />

            <FormGroup>
              <ControlLabel>Travel date</ControlLabel>
              <br />
              <DatePicker
                selected={this.state.travel_date}
                onChange={this.handleDateChange}
              />
            </FormGroup>

          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.clearAndClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Save changes</Button>
        </Modal.Footer>

      </Modal>
    )
  }
}
