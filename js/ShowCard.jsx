import React from 'react';
import { shape, string } from 'prop-types';

const ShowCard = props =>
  <div className="show-card">
    <img src={`/public/img/posters/${props.show.poster}`} alt={`${props.show.title} Show Poster`} />
    <div>
      <h3>
        {props.show.title}
      </h3>
      <h4>
        {props.show.year}
      </h4>
      <p>
        {props.show.description}
      </p>
    </div>
  </div>;

ShowCard.propTypes = {
  show: shape({
    poster: string.isRequired,
    title: string.isRequired,
    year: string.isRequired,
    decription: string.isRequired
  }).isRequired
};

export default ShowCard;
