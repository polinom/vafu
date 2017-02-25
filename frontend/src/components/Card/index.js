import React from 'react';
import './style.css';
import { Col } from 'react-bootstrap';

const Card = (props) => (
  <Col xs={6} lg={4}>
    <div className="Card-container">
      <div className="Card">
        <div className="Card-text">

          {props.children}

        </div>
      </div>
    </div>
  </Col>
);

export default Card;
