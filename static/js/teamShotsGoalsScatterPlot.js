 queue()
        .defer(d3.json, "/data")
        .await(makeGraphs);
    function makeGraphs(error, footballData) {
        var ndx = crossfilter(footballData);
        
          footballData.forEach(function (d) {
            d.totalShots = +d.HomeShots + +d.AwayShots;
            d.totalGoals = +d.FullTimeHomeGoals + +d.FullTimeAwayGoals;
        });
        
        var shots_dim = ndx.dimension(function(d){
            return +d.totalShots;
        });
        
        var min_shots = shots_dim.bottom(1)[0].totalShots;
        var max_shots = shots_dim.top(1)[0].totalShots;
    
        var goals_dim = ndx.dimension(function(d){
            return [+d.totalShots, +d.totalGoals ];
        });
        var goals_group = goals_dim.group();
        var goals_chart = dc.scatterPlot("#scatter-plot");
        goals_chart
            .width(1000)
            .height(500)
            .x(d3.scale.linear().domain([min_shots, max_shots]))
            .brushOn(false)
            .symbolSize(6)
            .clipPadding(10)
            .xAxisLabel("Shots")
            .yAxisLabel("Goals")
            .dimension(goals_dim)
            .group(goals_group);
        dc.renderAll();
    }