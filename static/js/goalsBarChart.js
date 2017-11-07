queue()
        .defer(d3.csv, "data/football.csv")
        .await(makeGraphs);
    function makeGraphs(error, footballData) {
        var ndx = crossfilter(footballData);
        
        var home_team_dim = ndx.dimension(function (d) {
            if (d.HomeTeam === 'Liverpool') {
                    return d.Date;
            } else {
                    return "";
                }
            });
    
        var team_goals = home_team_dim.group().reduceSum(function (d) {
                if (d.HomeTeam === 'Liverpool') {
                    return +d.FullTimHomeGoals;
                } else {
                    return 0;
                }
            });
    
    dc.barChart("#team-goals-chart")
        .width(1200)
        .height(450)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(home_team_dim)
        .group(team_goals)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Dates")
        .yAxisLabel("Goals")
        .yAxis().ticks(8);
        
  
    dc.renderAll();
    }