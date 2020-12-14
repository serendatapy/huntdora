# [Huntdora](https://huntdora.netlify.app/)

## What is it
<img src="https://github.com/serendatapy/huntdora/blob/master/readme_assets/Screen%20Shot%2013-12-2020%20at%2022.14.png"></img>

Searching for a job can be tough and demoralising. Huntdora is a job searching app which focuses on uplifting the job seeker through design and user experience, as well as through its utility.
<p align="center">
<img align="center" src="https://github.com/serendatapy/huntdora/blob/master/readme_assets/5abfbec86fcf93acb12125081ef3fbb809f38e42.gif"></img>
</p>
At the moment Huntdora has reached it's MVP stage and allows the user to search for real jobs, using a job API.  
<p align="center">
<img src="https://github.com/serendatapy/huntdora/blob/master/readme_assets/Screen%20Shot%2013-12-2020%20at%2022.36.png"></img>
</p>
The user can save the jobs they're interested in and apply to them. 

## Tech Stack

```
♦ React JS
♦ Typescript
♦ PWA & Netlify Deployment
♦ Material-UI
♦ External API
♦ GraphQL
```
## Upcoming Features

- Own Backend to improve Stability and Performance and implement caching
- Ability to mark jobs as unwanted, to avoid seeing them in future searches
- Authentication and DB to store user information

## Running Huntdora
The easiet way is to visit the [live website](https://huntdora.netlify.app/)
You can also install the PWA for improved performance

Alternatively, to run it locally, clone/download the repo:
From the client folder

```
yarn install
yarn start
```

In the .env.development.local file you'll need a reed.co.uk key, and to insert the base URL using

```
REACT_APP_API_KEY = your-personal-api-key
if you're running your own proxy
REACT_APP_BASE_URL = http://localhost:8080/https://www.reed.co.uk/api/1.0
Or using online cors anywhere proxy
https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0
```

## Room for improvement

Checkout [Github Issues](https://github.com/serendatapy/huntdora/issues), in particular [Issue #23](https://github.com/serendatapy/huntdora/issues/23) which holds an overview
