# Jammming

Jammming is a React Project bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It allows a user to login using their Spotify account and search for songs and create a customized playlist on Spotify in an easier fashion. It also allows the user to give a custom name to the playlist

## Installation

### Requirements

1.  NodeJS and NPM or Yarn

### Local Machine testing

- Clone [this](https://github.com/vsifiwe/jammming) project from GitHub to your local machine
- In the project directory, you can run: `yarn start` or `npm run start`. This command runs the app in development mode on your local machine.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Operation

This application is paired with a NodeJS backend hosted on [Heroku](https://jammming-deezer.herokuapp.com/) and the code hosted on [Github](https://github.com/vsifiwe/jammming-deezer).
The API has the following methods:

- GET /auth : This endpoint returns a Deezer token that allows user's to authenticate and access protected routes on Deezer's API.
- GET /search: This endpoint allows a user to search through Deezer's catalogue
- GET /user: This endpoint returns the user's ID that is used to create a playlist on the user's deezer account.
- GET /createplaylist: This endpoint accepts the user's token, playlist name and songs and creates a playlist on the user's deezer account

### Deployment

This project is deployed on Netlify on [this link](https://silly-perlman-b4de38.netlify.app/).

### Screenshots

- Home Page
  ![Home Page](https://raw.githubusercontent.com/vsifiwe/jammming/main/screenshot/1.png)
- Search
  ![Search](https://raw.githubusercontent.com/vsifiwe/jammming/main/screenshot/search.png)
