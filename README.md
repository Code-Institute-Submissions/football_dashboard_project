# Football Dashboard Project

An interactive data visualisation web application representing data from the Premier Leagues 2016/17 season. This dashboard was built as the second project for the Code Institutes bootcamp.

## Demo

To view the live version of this website please follow this link https://dashboard-football.herokuapp.com/

## Installation

1. Firstly you will need to clone this repository by running the `git clone https://github.com/rcomiskey/football_dashboard_project` command
2. Download RoboMongo and MongoDB
3. Create a virtual environment `$ python3 -m venv ~/virtualenvs/<environment name>`
4. Then activate it with command `$ source ~/virtualenvs/<environment name>/bin/activate `
5. Install dependencies `$ sudo pip3 install -r requirements.txt`
6. Run Mongod `$ mongod --config config/mongoConfig.conf`
7. In the folder, right click 'dashboard.py' and select 'run python in terminal'
8. Open your browser and enter 'http://127.0.0.1:5000/' to view the app

## Built With

- HTML5
- CSS3
- Javascript
- Python
- Bootstrap

- [Flask](http://flask.pocoo.org/docs/0.12/)
    - **Flask** is a popular, extensible web microframework for building web applications with Python. It was used to render HTML pages and serve data.
- [MongoDB](https://www.mongodb.com/)
    - **MongoDB** is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas. This was used as the database for the project.
- [D3.js](https://d3js.org/)
    - **D3.js** is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS.
- [Dc.js](https://dc-js.github.io/dc.js/)
    - **dc.js** is a javascript charting library, it leverages d3 to render charts in CSS-friendly SVG format.
- [Crossfilter.js](http://square.github.io/crossfilter/)
    - **Crossfilter.js** is a JavaScript library for exploring large multivariate datasets in the browser. 
- [Queue.js](https://github.com/d3/d3-queue)
    - **Queue.js** evaluates zero or more deferred asynchronous tasks with configurable concurrency: you control how many tasks run at the same time. 
