////////////////
// THE MONEY PIE
////////////////

// The data as an array containing JS objects
piedata = [
    {label:"Student activities", value:24.5},
    {label:"Welfare & advice", value:26.3},
    {label:"National representation", value:3.3},
    {label:"Events", value:6.5},
    {label:"Other engagement", value:16.8},
    {label:"Core running costs", value:22.6}
    ];

// General vars
var width = 400,
    height = 400,
    radius = Math.min(width,height)/2;
    // A range of colours
    colors = d3.scaleOrdinal()
      .range(['rgba(255,255,255,0.1)','rgba(255,255,255,0.3)','rgba(255,255,255,0.5)','rgba(255,255,255,0.6)','rgba(255,255,255,0.7)','rgba(255,255,255,0.8)','rgba(255,255,255,0.9)']);

// Grab the blank SVG and give it some basic attributes
var chart = d3.select('svg#money')
  .attr('width','100%')
  .attr('viewBox','0,0,'+width+','+height)
  .attr('preserveAspectRatio','true')
  .style('background','rgba(255,255,255,0.0)')
  // Put a group element in the SVG to hold the graph slices
  .append('g')
    // Move the g to the midpoint of the svg
    .attr('transform','translate('+ (width/2) +','+ (height/2) +')')

// An initial label
var initial = chart.append('text')
  .attr('class','initial hover');
  // Fill the label with content
  initial.append('tspan')
      .html('Hover to explore')
      .attr('x','0')
      .attr('y','-10')
  initial.append('tspan')
      .html('£1')
      .attr('dy','1em')
      .attr('x','0')

// A helper function to calculate arc values
var arc = d3.arc()
  .innerRadius((Math.min(width,height)/4)-20)
  .outerRadius(radius-30);

// Helper function to process raw data values into pie-friendly values
var pie = d3.pie()
  .value(function(d){
    return d.value;
  })
  // Just keep things in the order they started in
  .sort(null)


var slice = chart.selectAll('g')
  .data(pie(piedata))
  // Enter the data onto the graph V IMPORTÁNTE
  .enter()
  // Put a group for every datapoint, which will contain the path and the label
  .append('g')
    .style('transform','translate(-2.5,-2.5)')
    // On hover, do stuff
    .on('mouseover', function(){
      initial.attr('class','initial')
      chart.selectAll('g').attr('class','')
      d3.select(this).attr('class','hover')
    })

var path = slice
    .append('path')
      // Add a 'd' attribute to each path, with a value from the arc helper function
      .attr('d',arc)
      // Use the color scale created above to assign a colour
      .attr('fill',function(d,i){
        return colors(d.data.label)
      })

var tip = slice.append('text')
  // .attr('transform', function(d){
  //   return 'translate('+radius+')';
  // })

tip.append('tspan')
    .html(function(d,i){
      return piedata[i].label;
    })
    .attr('x','0')
    .attr('y','-15')

tip.append('tspan')
    .html(function(d,i){
      return Math.round(d.value) +'p';
    })
    .attr('dy','1em')
    .attr('x','0')

//////////////////
// THE ADVICE BARS
//////////////////

// The data
var bardata = [
  {label:"Not specified", value:6},
  {label:"Academic", value: 138},
  {label:"Discrimination", value:6},
  {label:"Family", value:2},
  {label:"Hate crime", value:1},
  {label:"Housing", value:20},
  {label:"Immigration", value:1},
  {label:"Mental health", value:4},
  {label:"Personal injury", value:1},
  {label:"Finance", value:7},
  {label:"Student issues", value:11},
  {label:"Government benefits", value:1}
]

var bardata = bardata.sort(function(a,b){
  return parseFloat(b.value) - parseFloat(a.value)
})

// Vars
var width = 400,
    height = 400,
    barSpacing = 4,
    barWidth = (width/bardata.length)-barSpacing

// Grab the empty container
var barChart = d3.select('svg#advice')
  // Give it style
  .attr('width','100%')
  .attr('viewBox','0,0,'+width+','+height)
  .style('background','rgba(255,255,255,0.1)')

var bars = barChart.selectAll('g')
  // The data join
  .data(bardata)
  // Add a 'g' for each datapoint
  .enter().append('g')
  // Interactivity
  .on('mouseover',function(){
    bars.attr('class','')
    d3.select(this).attr('class','hover')
  })

// And a path inside each g
bars.append('rect')
  .attr('fill','rgba(255,255,255,0.7)')
  // Set the dimensions and position according to the daaaahta
  .attr('width',barWidth)
  // The critical one...............
  .attr('height',function(d){
    return d.value*2.3+10;
  })
  // Move each bar along the chart
  .attr('x',function(d,i){
    return (barWidth+barSpacing)*i;
  })
  // Flip the bars upside down
  .attr('y',function(d){
    return height-(d.value*2.3+10);
  })

// Add value labels to each bar
bars.append('text')
  .text(function(d){
    return d.value;
  })
  .attr('class','value')
  .attr('x',function(d,i){
    return ((barWidth+barSpacing)*i)+(barWidth/2);
  })
  .attr('y',function(d){
    return height-(d.value*2.3+10)-10;
  })
  .attr("dy", ".35em")
  .style('fill','white')

  // And category labels
  bars.append('text')
    .text(function(d){
      return d.label;
    })
    .attr('class','label')
    .attr('x',380)
    .attr('y',40)
    .style('fill','rgba(255,255,255,0.7)')
