
    
    function totalGoalsRowChart(ndx) {
        
        
        // var p=d3.scale.category20();
        // var r=p.range();
             
        var teamDimHome = ndx.dimension(dc.pluck('HomeTeam'));
        var goalsByTeamHome = teamDimHome.group().reduceSum(dc.pluck('FullTimeHomeGoals'));
        
        
               var goalsByTeam = teamDimHome.group().reduceSum(dc.pluck('FullTimeHomeGoals')) +  teamDimHome.group().reduceSum(dc.pluck('FullTimeAwayGoals'))  ; 
        
        
        
        
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
    
