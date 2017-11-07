with open('football.csv', 'r') as inFile:
    csvText = inFile.read()
    match = csv.loads(csvText)

new_matches = []
for match in matches:
        home = match['HomeTeam'] == 'HomeTeam'
        away = not home

        new_match = {
            'Date': match['Date'],
            'TeamId': team['TeamId'],
            'HomeOrAway': "Home" if home else "Away",
            'Shots': match['HomeShots'] if home else match['AwayShots'],
            'ShotsOnTarget': match['HomeShotsOnTarget'] if home else match['AwayShotsOnTarget']
        }

        if match['FullTimeResult'] == "A":
            new_match['FullTimeResult'] = "D"
        elif (home and match['FullTimeResult'] == "H"):
            new_match['FullTimeResult'] = "W"
        elif (away and match['FullTimeResult'] == "A"):
            new_match['FullTimeResult'] = "W"
        else:
            new_match['FullTimeResult'] = "L"

    new_matches.append(new_match)

with open('newMatches.csv', 'w') as outFile:
    outFile.write(csv.dumps(new_matches))