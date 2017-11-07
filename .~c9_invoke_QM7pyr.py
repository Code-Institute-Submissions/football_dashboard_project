from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

MONGODB_URI = os.environ.get('MONGODB_URI')
DBS_NAME = os.environ.get('MONGO_DB_NAME','rcomiskey_football')
COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME','football_matches')



# Modify the following for your fields
FIELDS = {'Div': True, 'Date': True, 'HomeTeam': True, 'AwayTeam': True,
          'FullTimeHomeGoals': True, 'FullTimeAwayGoals': True,
          'FullTimeResult': True, 'HalfTimeHomeGoals': True, 'HalfTimeAwayGoals': True, 'HalfTimeResult': True,
          'Referee': True, 'HomeShots': True, 'AwayShots': True, 'HomeShotsTarget': True,
          'AwayShotsTarget': True, 'HomeFouls': True, 'AwayFouls': True, 'HomeCorners': True,
          'AwayCorners': True, 'HomeYellow': True, 'AwayYellow': True, 'HomeRed': True,
          'AwayRed': True,'_id': False}

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/data")
def get_data():
    with MongoClient(MONGODB_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        results = collection.find(projection=FIELDS)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(results))


if __name__ == "__main__":
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))














