# MERN stack starter

[![Build Status](https://travis-ci.org/rfdickerson/mern-example.svg?branch=master)](https://travis-ci.org/rfdickerson/mern-example)

![](https://cloud.githubusercontent.com/assets/1310293/26016982/f111312a-372c-11e7-9005-a1b82e11fc78.png)

## Getting Started

1. Install dependencies with 

  ```
  yarn
  ````
  
2. Start the development environment

  ```
  yarn start-dev`
  ```
  
## Configuration (Optional)

You can create a `.env` file for specifying credential information for MongoDB. 

Create a new file called `.env` and put:

```
MONGO_URL=mongodb://localhost:27017/comments
MONGO_USER=username
MONGO_PASSWORD=password
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
