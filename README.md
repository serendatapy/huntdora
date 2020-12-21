# [Huntdora](https://huntdora.netlify.app/)

## What is it
<img src="https://github.com/serendatapy/huntdora/blob/master/readme_assets/Screen%20Shot%2013-12-2020%20at%2022.14.png"></img>

Searching for a job can be tough and demoralising. Huntdora is a job searching app which focuses on uplifting the job seeker through design and user experience, as well as through its utility.
<p align="center">
<img align="center" src="https://github.com/serendatapy/huntdora/blob/master/readme_assets/5abfbec86fcf93acb12125081ef3fbb809f38e42.gif"></img>
</p>
Huntdora is a fully responsive Progressive Web App (PWA) and it allows the user to search for real jobs in the UK using various filters. It achieves this by connecting to a Job API for the data. 
<p align="center">
<img src="https://github.com/serendatapy/huntdora/blob/master/readme_assets/Screen%20Shot%2013-12-2020%20at%2022.36.png"></img>
</p>
At the moment, the user can save the jobs they're interested in and apply to them. The app stores the choices of the authenticated user in a mongoDB database, so that the preferences can be accessed from anywhere.

## Tech Stack


#### Frontend
* React JS
* Typescript
* Progressive Web App (PWA) & Netlify Deployment
* [Heroku Express Server](https://github.com/serendatapy/mini-proxy)
* Material-UI
* Auth0 Authentication + Social Login
#### Backend - [Huntdora Server Repository](https://github.com/serendatapy/huntdora-server)
* Connection to Job Search API (reed.co.uk) 
* Javascript
* Express
* Auth0 - JWT authentication
* MongoDB

## Upcoming Features
- Ability to mark jobs as unwanted, to avoid seeing them in future searches
- More personalization and support for the job seeker
- Job Search Statistics

## Running Huntdora
The easiet way is to visit the [live website](https://huntdora.netlify.app/)

You can also **install** the Progressive Web App (PWA) from the website for improved performance by using a Chrome Browser on any device. The app will put an icon on the desktop, which can be uninstalled regularly like any other app.

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
