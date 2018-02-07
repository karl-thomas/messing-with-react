import React, { Component } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import sanitize from 'sanitize-html';
import media from '../utilities';

class PostDetails extends Component {
  static propTypes = { title: string, html: string, feature_image: string };

  componentDidMount() {
    const img = document.querySelector(`img[alt='${this.props.title}']`);
    console.log(img.offsetHeight);
  }

  initial = { style: { display: 'initial' } };
  render() {
    return (
      <React.Fragment>
        <Hero>
          <img src={this.props.feature_image} alt={this.props.title} />
          <figcaption>{this.props.title}</figcaption>
        </Hero>
        <Wrap dangerouslySetInnerHTML={{ __html: sanitize(this.props.html) }} />
      </React.Fragment>
    );
  }
}
const Hero = styled.figure`
  height: 100%;
  transition: all 0.5s ease-out;
  margin: -4em -3vw;
  max-width: calc(97vw - 250px);
  display: flex;
  flex-flow: row wrap;
  z-index: 0;

  ${media.phone`
    max-width:100vw;`};
  & img {
    width: 60%;
    justify-content: center;
    object-fit: cover;
  }
  & figcaption {
    width: 40%;
    animation: detailsTitleMove 1s 1;
    animation-timing-function: ease-out;
    color: white;
    font-size: 180%;
    padding: 2rem;
    background-color: hsla(279, 18%, 41%, 0.4);
    border-bottom-left-radius: 10px;
  }
`;

const Wrap = styled.article`
  display: initial;
  & > div {
    transition: all 1.2s ease-out;
    animation: detailsContentJostle 1.2s 1;
    animation-timing-function: ease-out;
    animation-delay: 1s;
    margin-left: -1rem;
    margin-right: 0;
    top: 50px;
    padding: 1.5em calc(2em + 4vw);
    position: relative;
    font-size: 21px;
    font-weight: 350;
    background-color: white;
    border-radius: 5px;
    & p {
      & code {
        background-color: hsla(161, 76%, 91%, 1);
        padding: 0 2px;
        border-radius: 5px;
      }
    }
  }
  z-index: 1;
  background-color: white;
`;
export default PostDetails;
