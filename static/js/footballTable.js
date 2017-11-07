var TeamName = 'Arsenal';
 
            var tabulate = function (data,columns) {
            var table = d3.select('body').append('table')
            var thead = table.append('thead')
	        var tbody = table.append('tbody')

	        thead.append('tr')
    	        .selectAll('th')
        	    .data(columns)
    	        .enter()
    	        .append('th')
    	        .text(function (d) { return d })

	        var rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr')
              

            var cells = rows.selectAll('td')
                .data(function(row) {
                    return columns.map(function (column) {
                        return { column: column, value: row[column] }
                    })
                })
                .enter()
                .append('td')
                .text(function (d) { return d.value })

                    return table;
            }
            
            d3.csv('data/football.csv',function (data) {
                
                data = data.filter(function(row) {
                    return row['HomeTeam'] == TeamName || row['AwayTeam'] == TeamName;
                })
                
	        var columns = ['Date','HomeTeam','FullTimHomeGoals', 'FullTimeAwayGoals', 'AwayTeam']
            tabulate(data,columns)
            
            
            

            d3.select("table").attr("class","table table-bordered") 
})