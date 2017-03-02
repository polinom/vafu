import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import './style.css';

const Footer = () => (
  <footer className="footer">
    <Grid className="Footer-container">
      <Row>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <ul className="nav nav-pills nav-stacked">
                <li><a href="#">About</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">User Agreement</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <ul className="nav nav-pills nav-stacked">
                <li><a href="#">Company</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <ul className="nav nav-pills nav-stacked">
                <li><a href="#">Help &amp; Support</a></li>
                <li><a href="#">Payments Processing</a></li>
                <li><a href="#">Why Save</a></li>
                <li><a href="#">Refer A Friend</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <ul className="nav nav-pills nav-stacked">
                <li><a href="#">Blog</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Tips &amp; Resources</a></li>
                <li><a href="#">Get the App</a></li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </Grid>
  </footer>
);

export default Footer;
