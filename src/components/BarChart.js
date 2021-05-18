import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { range } from "d3";

const BarChart = ({ data, height = 800, width = 800 }) => {
  const barChart = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 90 };

    const svg = d3
      .select(barChart.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let max = d3.max(data.map((e, i) => e.value));
    const x = d3.scaleLinear().domain([0, max]).range([0, width]);
    svg
      .append("g")
      .style("font-size", 10)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(data.map((d) => d.name))
      .padding(0.1);
    svg.append("g").call(d3.axisLeft(y)).style("font-size", 12);

    svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(d.value))
      .attr("height", y.bandwidth())
      .attr("fill", "#69b3a2");
  });

  return (
    <div id="chartArea">
      <svg ref={barChart}></svg>
    </div>
  );
};

export default BarChart;
