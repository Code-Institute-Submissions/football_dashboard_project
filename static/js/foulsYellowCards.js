// queue()
//         .defer(d3.json, "/data")
//         .await(makeGraphs);
//     function makeGraphs(error, footballData) {
//         var ndx = crossfilter(footballData);
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
            .width(1000)
            .height(400)
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
            
            .legend(dc.legend().x(915).y(0).itemHeight(15).gap(5));
        stackedChart.margins().right = 100;
        
        

        dc.renderAll();
    }
    