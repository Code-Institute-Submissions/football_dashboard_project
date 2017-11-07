var file = "data/football.csv";
var goalFields = ["FullTimHomeGoals", "FullTimeAwayGoals", "HalfTimeHomeGoals", "HalfTimeAwayGoals"];

d3.csv(file, function( error, data) {
    var goalsMap = {};
    data.forEach(function(d) {
        var goals = d.HomeTeam && d.AwayTeam;
        goalsMap[goals] = [];
        
        goalFields.forEach(function(field) {
            goalsMap
        })
    })
})