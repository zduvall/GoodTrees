# [Good-Trees](https://goodtrees.herokuapp.com/)

[Good-Trees](https://goodtrees.herokuapp.com/), where climbers find Good Trees to climb, for those who love the climb and the view from the top. A full-stack group project by [Andre Grant](https://github.com/IamDgrant), [Gabriel Gutierrez](https://github.com/OptimumMars), [Tommy Chen](https://github.com/btcblade), and [Zachary Duvall](https://github.com/zduvall).

![Welcome to Good Trees](https://good-trees.s3-us-west-1.amazonaws.com/GoodTrees-preview.png)

Logged-in users can create, update, and delete trees and reviews as well as add trees to their own forests (under the tags `Climbed` or `Want to Climb`). They can also compare their climbing score to other climbers on the [highest climber](https://goodtrees.herokuapp.com/highest-climbers) page.

Try the live site [here](https://goodtrees.herokuapp.com/).

Visit the [site wiki](https://github.com/zduvall/Good-Trees/wiki) to see the database schema, routes, user stories, and feature list (current and planned).

## Tech Stack

### [Good Trees](https://goodtrees.herokuapp.com/) uses the following tools, frameworks, and key packages:

- [Bcryptjs](https://www.npmjs.com/package/bcrypt)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Express-validator](https://express-validator.github.io/docs/)
- [Express.js](https://expressjs.com/)
- Hosted on [Heroku](https://dashboard.heroku.com/)
- [Pug.js](https://nodejs.org/en/)
- [Sequelize](https://sequelize.org/) (with [PostgreSQL](https://www.postgresql.org/))

### Icons and fonts are from:

- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)

## Run Toilet Surfing Locally

Follow these instructions to run Toilet Surfing on your local machine. Note: image uploads and map functionality will not work without a valid AWS key/secret and google Maps API key.

To run the Toilet Surfing application locally, refer to the following instructions:

1. `git clone` this repo
2. `cd` into the local clone of the repository
3. `cd` into the `backend` folder and `npm install`
4. Create your own `.env` file in `backend` and `frontend` directories based on the `.env.example` files there
5. Create a PostgreSQL user that matches the one you identified in your `backend` `.env` file
6. Run `npx dotenv sequelize db:create to create the database`
7. If the sequelize module is not found, try running `npx dotenv sequelize-cli db:create` and replace sequelize with sequelize-cli for the rest of these commands
8. Run `npx dotenv sequelize db:migrate` to run the migrations
9. Run `npx dotenv sequelize db:seed:all` to seed the database
10. Open another terminal and `cd` into the `frontend` directory and `npm install`
11. Run `npm start` in both the terminal on your backend and frontend
12. The React server should open up a browser window with the correct address
