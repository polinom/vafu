import React from 'react';
import './style.css';
import { Col } from 'react-bootstrap';

const Card = ({ title, image, description, seller_name, favorite_id, onFavoritedToggle }) => (
  <Col xs={6} lg={4}>
    <div className="Card-container">
      <div className="Card">

        <div className="Card-text">

          <div
            className={`Card-fab Card-favorited-${favorite_id ? 'true' : false}`}
            onClick={onFavoritedToggle.bind(this)}
          ></div>

          <h3 className="Card-header">Vacation package</h3>

          <p className="Card-subheader">
            {title}
          </p>

          <p>
            {description}
          </p>

          <p className="text-center">
            - {seller_name} -
          </p>

        </div>

        <div className="Card-image">
          <img src={image}
               width="100%"
               role="presentation"
          />
        </div>

      </div>
    </div>
  </Col>
);

export default Card;
