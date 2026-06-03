# DevAtlas 🚀

DevAtlas is a full-stack developer analytics platform that provides detailed insights into a GitHub profile using real GitHub GraphQL data. The application analyzes repositories, programming languages, contributions, activity patterns, and community engagement to generate meaningful developer metrics and visualizations.

## Features

### Authentication

* User Registration
* Secure Login with JWT Authentication
* Password Hashing using bcrypt

### GitHub Analytics

* GitHub Profile Analysis
* Repository Statistics
* Total Stars and Forks
* Contribution Heatmap
* Programming Language Distribution
* Follower Insights

### Developer Scoring System

* Community Score
* Activity Score
* Quality Score
* Profile Strength Rating
* Developer Level Classification

  * Beginner
  * Intermediate
  * Advanced
  * Expert
  * Elite

### Visualizations

* Contribution Heatmap
* Language Distribution Chart
* Repository Overview Dashboard
* Developer Score Dashboard

## Tech Stack

### Frontend

* React.js
* Axios
* Recharts
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

### APIs

* GitHub GraphQL API

## Project Architecture

project/
├── backend/
│ ├── server.js
│ ├── models/
│ └── routes/
│
├── frontend/
│ ├── src/
│ ├── components/
│ └── pages/
│
└── README.md

## Installation

### Clone Repository

git clone https://github.com/Siri1646/DevAtlas.git

cd DevAtlas

### Backend Setup

cd backend

npm install

Create a .env file:

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GITHUB_TOKEN=your_github_token

Start backend:

npm start

### Frontend Setup

cd frontend

npm install

npm start

## Future Improvements

* GitHub User Comparison
* AI-powered Profile Recommendations
* Repository Trend Analysis
* Contribution Forecasting
* Export Reports as PDF
* Dark/Light Theme Toggle

## Author

M. Siri Chandana

Civil Engineering Undergraduate

Indian Institute of Technology Roorkee

## License

This project is developed for educational and portfolio purposes.
