import React from 'react';
import './style.css';
import Card from '../Card';

const DealCard = ({ title, image, description, seller_name, favorite_id, onFavoritedToggle }) => (
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
      <img src={image}
           width="100%"
           role="presentation"
      />
    </div>
  </Card>
);

export default DealCard;
