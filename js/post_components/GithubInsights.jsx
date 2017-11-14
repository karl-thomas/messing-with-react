// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
// import Wrap from '../shared/StyledComponents';
// import { colors } from '../utilities';
import Insight from './Insight';
import Link from '../shared/PanningLink';

// karls react styleguide ---- :) ---

// violations of camel case are due to the rails api-
// this information is being interpreted from

// a component that is too small is something that will not be
// used outside of the context in which it currently lives
const Ul = styled.ul`
  display: inline-block;
  margin: 0px;
  padding: 0px;
`;
type Props = {
  most_used_lang: Array<any>,
  most_recent_project: Object,
  most_viewed_repo: Object
};

class GithubInsights extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  props: Props;

  mostViewedProject = () => {
    const project = this.props.most_viewed_repo;
    return (
      <Insight source="github" title="Most Viewed Project">
        <p>
          Recently my project &apos;{project.name}&apos; has gotten {project.recent_views} views and
          {` ${project.uniques}`} unique views
        </p>
        <br />
        <Link to={project.url} width="175" height="24">
          Project on github
        </Link>
      </Insight>
    );
  };

  mostUsedLang = () => {
    const lang = this.props.most_used_lang;
    return (
      <Insight source="github" title="Most Used language">
        <p>
          In the past two weeks I have written {this.bytesToSize(lang[1])} of {lang[0]}
        </p>
      </Insight>
    );
  };

  mostRecentProject = () => {
    const project = this.props.most_recent_project;
    return (
      <Insight source="github" title="Recent Project">
        <p>
          I have recently made {project.recent_commits} commits on my project, &apos;{project.name}&apos;
        </p>
        <br />
        <Link to={project.url} width="175" height="24">
          Project on github
        </Link>
      </Insight>
    );
  };

  // human readable version of byte size
  bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  render() {
    return (
      <Ul>
        {this.mostViewedProject()}
        {this.mostRecentProject()}
        {this.mostUsedLang()}
      </Ul>
    );
  }
}

export default GithubInsights;
