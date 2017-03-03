import React from 'react';
import * as requests from '../../utils/requests';
import { Col, ControlLabel, Form, FormControl, FormGroup, Grid, Image, Jumbotron, Row } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import './style.css';
import FieldGroup from '../../components/FieldGroup/index';

export default class DealPage extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      id: null,
      title: null,
      image: null,
      description: null,
      destination_country: null,
      seller_name: null,
      price: null,
      favorited_by_me: null,
    };

    this.onToken = this.onToken.bind(this)
  }

  componentDidMount() {
    this.loadData(this.props.params['dealId']);
  };

  async loadData(dealId) {
    const data = await requests.fetchDealData(dealId);
    this.setState({
      ...data
    });
  };

  onToken(token){
    console.log(token)
    console.log(JSON.stringify(token))
    token['dealId'] = this.state.id
    requests.savePayment(JSON.stringify(token)).then(response => {
     console.log(response)
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <Jumbotron className="DealPage-container">

              <a className="DealPage-go-back" onClick={this.props.router.goBack}>🔙</a>

              <Form>
                <fieldset disabled="disabled">

                  <FieldGroup
                    id="id_title"
                    value={this.state.title || ''}
                    type="text"
                    label="Title"
                  />

                  <FieldGroup
                    id="id_image"
                    value={this.state.image || ''}
                    type="text"
                    label="Image URL"
                  />

                  <FormGroup controlId="id_description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      value={this.state.description || ''}
                    />
                  </FormGroup>

                  <FieldGroup
                    id="id_destination_country"
                    value={this.state.destination_country || ''}
                    type="text"
                    label="Destination country"
                  />

                  <FieldGroup
                    id="id_seller_name"
                    value={this.state.seller_name || ''}
                    type="text"
                    label="Seller name"
                  />

                  <FieldGroup
                    id="id_price"
                    value={this.state.price || ''}
                    type="number"
                    label="Price"
                  />

                  <FieldGroup
                    id="id_price"
                    value={this.state.favorite_id !== null || ''}
                    type="boolean"
                    label="Favorited by me"
                  />
                </fieldset>
              </Form>
              <StripeCheckout
               token={this.onToken}
               stripeKey="pk_test_TAIvO6Aw4G42SS6QNLIyvrwK"
               amount={this.state.price * 100}
               />
            </Jumbotron>
          </Col>

          <Col md={2}>
            <Image className="DealPage-image" src={this.state.image} responsive />
          </Col>
        </Row>
      </Grid>
    );
  }
}
