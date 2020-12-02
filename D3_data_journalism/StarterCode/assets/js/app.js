d3.csv("assets/data/data.csv").then(function(CensusData) {
    CensusData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });
  
var svgWidth = 1000;
var svgHeight = 500;
var margin = {
  top: 20,
  right: 50,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  const xScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.age))
    .range([0, width])
  const yScale = d3.scaleLinear()
    .domain([5,d3.max(CensusData, d => d.smokes)])
    .range([height, 0])
    .nice();

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chartGroup.append("g").call(yAxis);

chartGroup.selectAll("circle")
.data(CensusData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.age))
.attr("cy", d=>yScale(d.smokes))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75);

chartGroup.append("g")
  .selectAll('text')
  .data(CensusData)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.age))
  .attr("y",d=>yScale(d.smokes))
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central")
  .attr("font-size", "10px");


  chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .text("Median Age");

        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .style("font-weight", "bold")
        .attr("fill", "black")
        .text("Smokers (%)");
}).catch(function(error) {
  console.log(error);
});
