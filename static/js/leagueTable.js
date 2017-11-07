
d3.csv("data/football.csv", function (data) {

  data.forEach(function(d) { 
    d.HomeFouls   = +d.HomeFouls;
    d.AwayFouls  = +d.AwayFouls;

  });

  var dataTable = dc.dataTable("#dc-table-graph");

  var facts = crossfilter(data);

  var teamDimension = facts.dimension(function (d) {
    return d.HomeTeam;
  });

  
  dataTable.width(960).height(800)
    .dimension(teamDimension)
    .group(function(d) { return "League Table"
     })
    .size(10)
    .columns([
      function(d) { return d.HomeTeam; },
      function(d) { return d.HomeFouls; },
      function(d) { return d.AwayFouls; },
    ])
    .sortBy(function(d){ return d.HomeTeam; })
    .order(d3.ascending);

  dc.renderAll();
  
});