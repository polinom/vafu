import React from 'react';
import './style.css';
import Card from '../Card';
import { formatDateAsMonthYear, calcProgress } from '../../utils/index';
import { ProgressBar } from 'react-bootstrap';

const GoalCard = ({ title, image, budget_estimate, funding_progress, travel_date }) => (
  <Card>
    <h3 className="GoalCard-header">{title}</h3>

    <div className="GoalCard-image">
      <img src={image || 'https://placeholdit.imgix.net/~text?txtsize=60&txt=image&w=300&h=200'}
           width="100%"
           role="presentation"
      />
    </div>

    <p className="GoalCard-param">
      <span className="GoalCard-param-name pull-left">Travel date</span>
      <span className="pull-right">{formatDateAsMonthYear(travel_date)}</span>
    </p>

    <p className="GoalCard-param">
      <span className="GoalCard-param-name pull-left">Budget estimate</span>
      <span className="pull-right">${budget_estimate}</span>
    </p>

    <p className="GoalCard-param">
      <span className="GoalCard-param-name pull-left">Funding progress</span>
      <span className="pull-right">${funding_progress}</span>
    </p>

    <ProgressBar
      className="GoalCard-progress"
      bsStyle="success"
      now={calcProgress(funding_progress, budget_estimate)}
      label={`${calcProgress(funding_progress, budget_estimate)}%`}
    />

    {/*<p className="text-center">*/}
    {/*- {seller_name} -*/}
    {/*</p>*/}

  </Card>
);

export default GoalCard;
