# MERN stack starter [![Build Status](https://travis-ci.org/rfdickerson/mern-example.svg?branch=master)](https://travis-ci.org/rfdickerson/mern-example)

The MERN stack starter demonstrates a working application that uses a React frontend, with a backend build with ExpressJS and MongoDB. It shows how the client can make client HTTP requests and maintain persistant sessions. 

## Getting Started

  Install dependencies with:

  ```
  yarn
  ```
  
Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   
Start the development environment:

  ```
  yarn start-dev
  ```

## Docker Compose

  If you use Docker and Docker Compose, you can start the entire project with:

  ```
  docker-compose up
  ```
 
## Configuration (Optional)

By default, the server will expect to connect to a MongoDB instance running on localhost:27017. However, you can customize the environment to use different values for the MongoDB host. To do that, you can create a `.env` file for specifying credential information for MongoDB. 

Create a new file called `.env`, with the following YAML:

```yaml
MONGO_URL=mongodb://localhost:27017/comments
MONGO_USER=username
MONGO_PASSWORD=password
```

or instead, you can use the equivalent JSON:

```json
{
  "mongo": {
    "url": "mongodb://localhost:27017/comments",
    "user": "username",
    "password": "password"
  }
}
```

Where the URL, username, and password are set to your preferences.

## Docker Development run

You can set up a local Docker development environment by building the image:

```
docker build -f Dockerfile-tools -t rfdickerson/mern-example .
```

And running the image:

```
docker run -p 3000:3000 -v ${PWD}:/app -t rfdickerson/mern-example
```

## Libraries

  - [axios](https://github.com/mzabriskie/axios) - promise-based HTTP client
  - [foreman](https://github.com/strongloop/node-foreman) - a Procfile-based application utility
  - [mongoose](http://mongoosejs.com/) - mongodb object modelling
  - [express](https://expressjs.com/) - minimalist Node.js framework
  - [react](https://facebook.github.io/react/) - JS library for building user interfaces
