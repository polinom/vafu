import React from 'react';
import './style.css';
import Card from '../Card';
import { Link } from 'react-router';

const DealCard = ({ title, image, description, seller_name, favorite_id, onFavoritedToggle, id }) => (
  <Card>
    <div
      className={`DealCard-fab DealCard-favorited-${favorite_id ? 'true' : false}`}
      onClick={onFavoritedToggle.bind(this)}
    ></div>

    <h3 className="DealCard-header">Vacation package</h3>

    <p className="DealCard-subheader">
      {title}
    </p>

    <p>
      {description}
    </p>

    <p className="text-center">
      - {seller_name} -
    </p>

    <div className="DealCard-image">
      <Link to={`/deals/${id}/`}>
        <img src={image}
             width="100%"
             role="presentation"
        />
      </Link>
    </div>
  </Card>
);

export default DealCard;
