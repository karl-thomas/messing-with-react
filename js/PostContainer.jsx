import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 25vh;
  left: 25%;
  padding: 20px;
  background-color: rgba(200, 200, 200, 0.5);
  overflow-y: scroll;
  height: 77vh;
  width: 70%;
`;

class PostContainer extends Component {
  state = {
    apiData: {}
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () =>
    axios
      .get('http://localhost:3000/posts')
      .then(response => this.setState({ apiData: response.data }))
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });

  render() {
    return (
      <Wrapper>
        <pre>
          <code>{JSON.stringify(this.state.apiData, null, 4)}</code>
        </pre>
      </Wrapper>
    );
  }
}

export default PostContainer;
