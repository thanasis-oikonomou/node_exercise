# Development environment

In order to run application use:
      `docker-compose up`

## Notes:
We have three images, one for backend server, one for frontend app and one for the database. When the backend server's image build, we run the migration (`./Dockerfile:20`) and the process throws an error because database hasn't initialize yet. Even with the `depends_on: postgres_db` in `docker-compose.yml` sometimes failed.

If this problem occur, I advice to comment the line 20 in `./DockerFile` and follow the process:
- run `docker-compose up`

In another terminal
- run `docker ps`

Find the image with name `node_exercise_api` and take the container id

- run `docker exec -it ${CONTAINER_ID} bash`

Run inside docker image `yarn migrate` to run the DB migrations

# Implementation details

## Backend Server
The project is organized in a MVC structure and all the business logic are in the services. The controllers map incoming requests from the routes to the proper service. Under the models folder are all the models definitions and assosiations. All the database migrations are under the migrations folder.

### Endpoints
- POST `/feedDB` route feeds the database with data from seeds.xlsx file
- GET `/users` route is for searching the user table. It supports the two parameters the searchText and userIds, but the cannot combined. For example, calling the endpoint with searchText like this `/users?searchText=Mark`, the route will return the users based on a freetext search on users firstName and lastName. Calling this endpoint with userIds like this `/users?userIds[]=1&userIds[]=2...`, the route will return the users with the ids provides in userIds[] parameters.
- GET `/messages` route is for retrieving the messages of two (or more) users. For example, calling the `/messages?userIds[]=1&userIds[]=2...`, the route will return the messages between the users provided in userIds ordered by timestampSent.
- GET `/users/:userId/recent-contacts` route is for returning all the recent contacted user accounts of a user, ordered by the the user with the most recent sent message.

## Frontend App
The project uses React with Redux for state management, Bootstrap for styling and Axios for the requests to the backend server. At the top of the user interface, appears a search bar for searching the users and select one of them. When a user is selected, the recent contacts load and by clicking on each contact the messages of the two users appears in the chat.
