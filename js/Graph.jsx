/* eslint react/forbid-prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media, { sizes } from './utilities';

const Wrap = styled.div`
  ${media.phone`
    & > svg > g {
      transform: translate(20px,20px)
    }
    `};
`;
class Graph extends Component {
  state = {
    data: [],
    svg: {}
  };

  componentDidMount() {
    this.selectAndDraw();
  }

  componentDidUpdate() {
    d3.selectAll('svg > *').remove();
    this.selectAndDraw();
  }

  selectAndDraw = () => {
    const data = this.convertToSimpleData(this.props.github_record.counts_by_date);
    const svg = this.selectSvg();
    this.draw(data, svg);
  };

  screenWidth = () =>
    window.innerWidth > sizes.phone
      ? Math.ceil(window.innerWidth * 97 / 100 - 200)
      : Math.ceil(window.innerWidth);

  convertToSimpleData = start => {
    const data = Object.keys(start).map(date => ({
      date,
      data: Object.values(start[date]).reduce((a, b) => a + b, 0)
    }));
    return data;
  };

  selectSvg = () => {
    let svg = d3.select('svg');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +this.screenWidth() - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    svg = {
      margin,
      width,
      height,
      g: svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
    };

    return svg;
  };

  draw = (data, svg) => {
    const x = d3.scaleTime().rangeRound([0, svg.width]);
    const y = d3.scaleLinear().rangeRound([svg.height, 0]);
    data.forEach(d => {
      d.date = d3.timeParse('%Y-%m-%d')(d.date);
      d.data = +d.data;
    });

    x.domain(d3.extent(data, d => d.date));
    y.domain([0, d3.max(data, d => Math.max(d.data))]);

    svg.g
      .append('g')
      .attr('transform', `translate(0,${svg.height})`)
      .call(d3.axisBottom(x))
      .select('.domain');

    svg.g
      .append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('contributions');
    const line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.data));
    svg.g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  render() {
    return (
      <Wrap>
        <svg width="1200" height="500" />
      </Wrap>
    );
  }
}
Graph.propTypes = {
  github_record: PropTypes.any
};

export default Graph;
