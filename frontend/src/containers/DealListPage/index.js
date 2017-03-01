import React from 'react';
import { Button, ButtonGroup, Col, Grid, Row } from 'react-bootstrap';
import DealCard from '../../components/DealCard';
import './style.css';
import * as requests from '../../utils/requests';

export default class DealListPage extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      deals: []
    }
  }

  componentDidMount() {
    this.loadData(this.getSection());
  };

  async loadData(section) {
    this.setState({
      deals: await requests.fetchDealListData(section)
    });
  };

  setSection(section) {
    this.props.router.push('/deals/?section=' + section);

    this.loadData(section);
  }

  toggleFavorited(dealId, favoriteId) {
    requests.toggleFavoriteDeal(dealId, favoriteId, () => this.loadData(this.getSection()));
  };

  getSection() {
    return this.props.router.location.query.section || 'browse';
  }

  render() {
    const deals = this.state.deals.map((deal) => {
        return (
          <DealCard
            key={deal.id}
            {...deal}
            onFavoritedToggle={this.toggleFavorited.bind(this, deal.id, deal.favorite_id)}
          />
        )
      }
    );

    const section = this.getSection();

    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3}>
            <div className="text-center">

              <ButtonGroup className="DealListPage-btn-group">

                <Button bsStyle={section === 'browse' ? 'info' : 'default'}
                        onClick={() => this.setSection('browse')}
                >
                  Browse
                </Button>

                <Button bsStyle={section === 'favorites' ? 'info' : 'default'}
                        onClick={() => this.setSection('favorites')}
                >
                  Favourites
                </Button>

                <Button bsStyle={section === 'for_you' ? 'info' : 'default'}
                        onClick={() => this.setSection('for_you')}
                >For You
                </Button>

              </ButtonGroup>

            </div>

            <div className="text-center">

              <ButtonGroup className="DealListPage-btn-group">
                <Button>Filter</Button>
              </ButtonGroup>

            </div>
          </Col>
        </Row>

        <Row className="DealListPage-deals">
          {deals}
        </Row>
      </Grid>
    );
  }
}
