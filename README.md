# [Good-Trees](https://goodtrees.herokuapp.com/)

[Good-Trees](https://goodtrees.herokuapp.com/), where climbers find Good Trees to climb... for those who love the climb and the view from the top. A full-stack group project by [Andre Grant](https://github.com/IamDgrant), [Gabriel Gutierrez](https://github.com/OptimumMars), [Tommy Chen](https://github.com/btcblade), and [Zachary Duvall](https://github.com/zduvall).

![Welcome to Good Trees](https://good-trees.s3-us-west-1.amazonaws.com/GoodTrees-preview.png)

Logged-in users can create, update, and delete trees and reviews as well as add/remove trees to/from their own forests (under the tags `Climbed` or `Want to Climb`). Users can also compare their climbing score to other climbers on the [highest climber](https://goodtrees.herokuapp.com/highest-climbers) page.

Try the live site [here](https://goodtrees.herokuapp.com/).

Visit the [site wiki](https://github.com/zduvall/GoodTrees/wiki) to see the database schema, routes, user stories, and feature list (current and planned).

[![Contributors](https://img.shields.io/github/contributors/zduvall/GoodTrees)](https://www.github.com/zduvall/GoodTrees/contributors)
[![Open Issues](https://img.shields.io/github/issues/zduvall/GoodTrees)](https://www.github.com/zduvall/GoodTrees/issues)
[![Forks](https://img.shields.io/github/forks/zduvall/GoodTrees)](https://www.github.com/zduvall/GoodTrees/forks)
[![Stars](https://img.shields.io/github/stars/zduvall/GoodTrees)](https://www.github.com/zduvall/GoodTrees/stars)

## Tech Stack

### [Good Trees](https://goodtrees.herokuapp.com/) uses the following tools, frameworks, and key packages:

- [Bcryptjs](https://www.npmjs.com/package/bcrypt)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Express-validator](https://express-validator.github.io/docs/)
- [Express.js](https://expressjs.com/)
- [Google Fonts](https://fonts.google.com/)
- Hosted on [Heroku](https://dashboard.heroku.com/)
- [Pug.js](https://pugjs.org/api/getting-started.html)
- [Sequelize](https://sequelize.org/) (with [PostgreSQL](https://www.postgresql.org/))

## Run Good Trees Locally

Follow these instructions to run Toilet Surfing on your local machine. Note: image uploads and map functionality will not work without a valid AWS key/secret and google Maps API key.

To run the Toilet Surfing application locally, refer to the following instructions:

1. `git clone` this repo
2. `cd` into the local clone of the repository
3. Run `npm install`
4. Create your own `.env` file based on the `.env.example`
5. Create a PostgreSQL user that matches the one you identified in your `.env` file
6. Run `npx dotenv sequelize db:create` to create the database
7. If the sequelize module is not found, try running `npx dotenv sequelize-cli db:create` and replace sequelize with sequelize-cli for the rest of these commands
8. Run `npx dotenv sequelize db:migrate` to run the migrations
9. Run `npx dotenv sequelize db:seed:all` to seed the database
10. Run `npm start`
11. Navigate to `http://localhost:8080/` in a browser
