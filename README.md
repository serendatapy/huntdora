# [Hundora](https://huntdora.netlify.app/)

## What is it

Searching for a job can be tough and demoralising. Huntdora is a job searching app which focuses on uplifting the job seeker through design and user experience, as well as through it's utility.

<img src="https://github.com/Snugles/bid-local/blob/development/readme%20assets/screens.jpg"></img>

At the moment Huntdora has reached it's MVP stage, and allows the user to search for real jobs, using a job API.  

<img src="https://github.com/Snugles/bid-local/blob/development/readme%20assets/screen6.jpg"></img>

The user can save the jobs they're interested in, and apply to them. 

## Video Presentation

<img src="https://github.com/Snugles/bid-local/blob/development/readme%20assets/screen6.jpg"></img>

## Tech Stack

```
♦ React JS
♦ Typescript
♦ Netlify Deploy
♦ Material-UI
♦ External API
♦ GraphQL
```

## Running Huntdora Locally

From the client folder

```
yarn install
yarn start
```

In the .env.development.local file you'll need a reed.co.uk key, and to insert the base url using

```
REACT_APP_API_KEY = your-personal-api-key
if you're running your own proxy
REACT_APP_BASE_URL = http://localhost:8080/https://www.reed.co.uk/api/1.0
Or using online cors anywhere proxy
https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0
```

## Upcoming Features

- Own Backend to improve Stability and Performance and implement caching
- Ability to mark jobs as unwanted, to avoid seeing them in future searches
- Authentication and DB to store user information

## Room for improvement

Checkout Github Issues