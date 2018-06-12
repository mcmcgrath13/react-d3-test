import React, { Component } from 'react';
import * as d3 from 'd3';

export default class MeshChart extends Component {

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.redrawChart();
  }

  drawChart() {
    let data = this.props.data
    const margin = {top: 20, right: 20, bottom: 30, left: 40}
    const svgWidth = 800
    const svgHeight = 300

    let width = svgWidth - margin.left - margin.right
    let height = svgHeight - margin.top - margin.bottom

    let svg = d3.select(this.refs.meshChart)
      .append('svg')
      .attr('class','mesh-chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    // Create a transition to use later
    let t = d3.transition()
      .duration(250)
      .ease(d3.easeCubicInOut)

    // X scale to scale position on x axis
    let xScale = d3.scaleBand()
      .domain(data.map(d => d.x).sort(d3.ascending))
      .range([0, width])
      .padding(0.1)

    // Y scale to scale radius of circles proportional to size of plot
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.y))])
      .range([height, 0])

    var plot = svg.append('g')
      .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
      .attr('class', 'plot-area')

    var xAxis = plot.append('g')
      .attr('class','axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    var yAxis = plot.append('g')
      .attr('class','axis axis--y')
      .call(d3.axisLeft(yScale).ticks(10));

    // UPDATE EXISTING
    let bars = plot.selectAll('.bar').data(data)

    // EXIT
    bars
      .exit()
      .transition(t)
      .attr('y', height)
      .attr('height', 0)
      .remove()

    // ENTER
    let enterJoin = bars
      .enter()
      .append('rect')
      .attr('class','bar')

      // Set initial size to 0 so we can animate it in from 0 to actual scaled radius
      .attr('x', d => xScale(d.x))
      .attr('y', () => height)
      .attr('width', () => xScale.bandwidth())
      .attr('height', () => 0)

    // MERGE + UPDATE EXISTING
    enterJoin
      .merge(bars)
      .transition(t)
      .attr('x', d => xScale(d.x))
      .attr('y', d => d3.min([height-1, yScale(d.y)]))
      .attr('width', () => xScale.bandwidth())
      .attr('height', d => d3.max([1,height - yScale(d.y)]))

    xAxis
      .transition(t)
      .call(d3.axisBottom(xScale))

    yAxis
      .transition(t)
      .call(d3.axisLeft(yScale).ticks(10)) //WHY NO Y TICKS???
  }

  redrawChart() {
    let data = this.props.data
    const margin = {top: 20, right: 20, bottom: 30, left: 40}
    const svgWidth = 800
    const svgHeight = 300

    let width = svgWidth - margin.left - margin.right
    let height = svgHeight - margin.top - margin.bottom

    let svg = d3.select('svg.mesh-chart');

    // Create a transition to use later
    let t = d3.transition()
      .duration(250)
      .ease(d3.easeCubicInOut)

    // X scale to scale position on x axis
    let xScale = d3.scaleBand()
      .domain(data.map(d => d.x).sort(d3.ascending))
      .range([0, width])
      .padding(0.1)

    // Y scale to scale radius of circles proportional to size of plot
    let yScale = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.y))])
      .range([height, 0])

    var plot = svg.select('g.plot-area')

    var xAxis = plot.select('g.axis--x')

    var yAxis = plot.select('g.axis--y')

    // UPDATE EXISTING
    let bars = plot.selectAll('.bar').data(data)

    // EXIT
    bars
      .exit()
      .transition(t)
      .attr('y', height)
      .attr('height', 0)
      .remove()

    // ENTER
    let enterJoin = bars
      .enter()
      .append('rect')
      .attr('class','bar')

      // Set initial size to 0 so we can animate it in from 0 to actual scaled radius
      .attr('x', d => xScale(d.x))
      .attr('y', () => height)
      .attr('width', () => xScale.bandwidth())
      .attr('height', () => 0)

    // MERGE + UPDATE EXISTING
    enterJoin
      .merge(bars)
      .transition(t)
      .attr('x', d => xScale(d.x))
      .attr('y', d => d3.min([height-1, yScale(d.y)]))
      .attr('width', () => xScale.bandwidth())
      .attr('height', d => d3.max([1,height - yScale(d.y)]))

    xAxis
      .transition(t)
      .call(d3.axisBottom(xScale))

    yAxis
      .transition(t)
      .call(d3.axisLeft(yScale).ticks(10)) //WHY NO Y TICKS???
  }

  render() {
    return(
      <div ref="meshChart"></div>
    )
  }
}
