import React from 'react';
import { Grid, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Base from '../../containers/Base';
import DealCard from '../../components/DealCard';
import './style.css';
import * as requests from '../../utils/requests';

export default class DealPage extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      section: 'Favourites',
      deals: []
    }
  }

  componentDidMount() {
    this.loadDealsData(this.state.section);
  };

  async loadDealsData(section) {
    this.setState({
      deals: await requests.fetchDealsData(section)
    });
  };

  setSection(section) {
    this.setState({
      ...this.state,
      section
    });

    this.loadDealsData(section);
  }

  toggleFavorited(dealId, favoriteId) {
    requests.toggleFavoriteDeal(dealId, favoriteId, () => this.loadDealsData(this.state.section));
  };

  render() {
    const deals = this.state.deals.map((deal) => {
        return (
          <DealCard
            key={deal.id} {...deal}
            onFavoritedToggle={this.toggleFavorited.bind(this, deal.id, deal.favorite_id)}
          />
        )
      }
    );

    return (
      <Base>
        <Grid>
          <Row>
            <Col md={6} mdOffset={3}>
              <div className="text-center">

                <ButtonGroup className="DealPage-btn-group">

                  <Button bsStyle={this.state.section === 'Browse' ? 'info' : 'default'}
                          onClick={() => this.setSection('Browse')}
                  >
                    Browse
                  </Button>

                  <Button bsStyle={this.state.section === 'Favourites' ? 'info' : 'default'}
                          onClick={() => this.setSection('Favourites')}
                  >
                    Favourites
                  </Button>

                  <Button bsStyle={this.state.section === 'For You' ? 'info' : 'default'}
                          onClick={() => this.setSection('For You')}
                  >For You
                  </Button>

                </ButtonGroup>

              </div>

              <div className="text-center">

                <ButtonGroup className="DealPage-btn-group">
                  <Button>Filter</Button>
                </ButtonGroup>

              </div>
            </Col>
          </Row>

          <Row className="DealPage-deals">
            {deals}
          </Row>
        </Grid>
      </Base>
    );
  }
}
