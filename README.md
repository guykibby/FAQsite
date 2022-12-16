
# PERN Stack application 

It is a mock FAQ website set up for an educational institute. Students can browse FAQs by year/term/topic. They can also post new questions and post answers to questions. Instructors, who have an instructors scope, can review all new posts on a dashboard, and either delete the post, star the post (so it is highlighted and displayed at the top) and remove the post from the dashboard.

Site is deployed here:

- https://client-g0hy.onrender.com/
- Please be patient with the loading as the DB takes a while to start becuase it is hosted by Render on a free tier service.

Or run it locally:
Required - Node, Docker
Terminal commands to run:
- docker-compose up -build
- docker-compose exec api npm run db-migrations:up
Then open localhost:3000 in browser

You can sign in as 12345@DI.com, password 'DIROCKS', this user has an instructors scope.

If you wish to sign in as a student simply try to login, you will be directed to a sign up page and go from there.

# Features of note:

Migrations to deploy the DB.
- https://github.com/guykibby/FAQsite/tree/main/api/migrations

GitHub Workflow for continuous intergration.
- https://github.com/guykibby/FAQsite/tree/main/.github/workflows

Render.yaml file for deployment.
- https://github.com/guykibby/FAQsite/blob/main/render.yaml

Docker compose to run all three containers, the DB, the API, and the React app.
- https://github.com/guykibby/FAQsite/blob/main/docker-compose.yaml

React app route structure
- https://github.com/guykibby/FAQsite/blob/main/client/src/App.js

Use of bcrypt to hash passwords and Json Web Tokens for authentication.
- https://github.com/guykibby/FAQsite/blob/main/api/routes/usersRouter/users.router.js


