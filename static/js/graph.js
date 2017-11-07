 queue()
        .defer(d3.json, "/data")
        .await(makeGraphs);
        
    function makeGraphs(error, footballData) {
        var ndx = crossfilter(footballData);

            foulsYellowCards(ndx);
            homeDrawAway(ndx);
            teamShotsGoalsScatterPlot(ndx);
            teamShotsTargetGoalsScatterPlot(ndx);
            totalGoalsRowChart(ndx);
    
        function foulsYellowCards(ndx) {
            
            footballData.forEach(function (d) {
            d.totalFouls = +d.HomeFouls + +d.AwayFouls;
            d.totalYellowCards = +d.HomeYellow + +d.AwayYellow;
            d.totalRedCards = +d.HomeRed + +d.AwayRed;
        });

        var ref_dim = ndx.dimension(dc.pluck('Referee'));
        
        var foulsByRef = ref_dim.group().reduceSum(dc.pluck('totalFouls'));
        var yellowCardsByRef = ref_dim.group().reduceSum(dc.pluck('totalYellowCards'));
        var redCardsByRef = ref_dim.group().reduceSum(dc.pluck('totalRedCards'));

        var gamesPerRef = ref_dim.group().all();
        
        var stackedChart = dc.barChart("#fouls-yellow-red-chart");
        stackedChart
            .width(750)
            .height(300)
            .margins({ top: 10, left: 30, right: 10, bottom: 70 }) 
            .dimension(ref_dim)
            .ordinalColors(['#5a9bca', '#ffc107', '#d70f00'])
            .group(foulsByRef, "Fouls")
            .valueAccessor(function(d){
                games = gamesPerRef.find(function(g) { return g.key == d.key });
                return d.value / games.value;
            })
            .stack(yellowCardsByRef, "Yellow Cards")
            .stack(redCardsByRef, "Red Cards")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .yAxisLabel("Total")
            
            .legend(dc.legend().x(675).y(0).itemHeight(15).gap(5));
        stackedChart.margins().right = 100;
            
        dc.renderAll();
    };
    
    function  homeDrawAway(ndx) {
    
    var chart = dc.pieChart("#home-draw-away-pie");
  
      team_dim  = ndx.dimension(function(d) {return d.FullTimeResult;})
      cornersSumGroup = team_dim.group();
      chart
          .width(250)
          .height(300)
          
          .slicesCap(3)
          .innerRadius(35)
          .externalLabels(25)
          .externalRadiusPadding(50)
          .drawPaths(true)
          .dimension(team_dim)
          .group(cornersSumGroup)
          
          .ordinalColors(['#31a354', '#74c476', '#a1d99b'])
          .legend(dc.legend());
      chart.on('pretransition', function(chart) {
          chart.selectAll('.dc-legend-item text')
              .text('')
            .append('tspan')
              .text(function(d) { return d.name; })
            .append('tspan')
              .attr('x', 60)
              .attr('text-anchor', 'end')
              .text(function(d) { return d.data; });
      });
      chart.render();

    }
    
     function teamShotsGoalsScatterPlot(ndx) {
    
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
            .width(500)
            .height(300)
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
    

    
     function teamShotsTargetGoalsScatterPlot(ndx) {
    
     footballData.forEach(function (d) {
            d.totalShotsTarget = +d.HomeShotsTarget + +d.AwayShotsTarget;
            d.totalGoals = +d.FullTimeHomeGoals + +d.FullTimeAwayGoals;
        });
        
        var shots_target_dim = ndx.dimension(function(d){
            return +d.totalShotsTarget;
        });
        
        var min_shotsTarget = shots_target_dim.bottom(1)[0].totalShotsTarget;
        var max_shotsTarget = shots_target_dim.top(1)[0].totalShotsTarget;
    
        var goalsTarget_dim = ndx.dimension(function(d){
            return [+d.totalShotsTarget, +d.totalGoals ];
        });
        var goalsTarget_group = goalsTarget_dim.group();
        var goalsTarget_chart = dc.scatterPlot("#goal-target-scatter-plot");
        goalsTarget_chart
            .width(500)
            .height(300)
            .x(d3.scale.linear().domain([min_shotsTarget, max_shotsTarget]))
            .brushOn(false)
            .symbolSize(6)
            .clipPadding(10)
            .xAxisLabel("Shots on Target")
            .yAxisLabel("Goals")
            .dimension(goalsTarget_dim)
            .group(goalsTarget_group)
            .ordinalColors(['#31a354']);
        
        dc.renderAll();
    }
    
    
    
    
    
    
    
    
    
    
        function totalGoalsRowChart(ndx) {
        
        
        // var p=d3.scale.category20();
        // var r=p.range();
             
        var teamDimHome = ndx.dimension(dc.pluck('HomeTeam'));
        var goalsByTeamHome = teamDimHome.group().reduceSum(dc.pluck('FullTimeHomeGoals'));
        dc.rowChart("#goals-by-team-chart-Home")
            .width(500)
            .height(500)
            .dimension(teamDimHome)
            .group(goalsByTeamHome)
            // .ordinalColors(r)
            .xAxis().ticks(10); 
            
            
        var teamDimAway = ndx.dimension(dc.pluck('AwayTeam'));
        var goalsByTeamAway = teamDimAway.group().reduceSum(dc.pluck('FullTimeAwayGoals'));
        dc.rowChart("#goals-by-team-chart-Away")
            .width(500)
            .height(500)
            .dimension(teamDimAway)
            .group(goalsByTeamAway)
            .xAxis().ticks(10); 
            
            dc.renderAll();
    };   
    
    
    
    };