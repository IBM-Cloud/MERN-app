# MERN stack starter [![Build Status](https://travis-ci.org/rfdickerson/mern-example.svg?branch=master)](https://travis-ci.org/rfdickerson/mern-example)

The MERN stack starter demonstrates a working application that uses a React frontend, with a backend build with ExpressJS and MongoDB. It shows how the client can make client HTTP requests and maintain persistant sessions. 

## Getting Started

To run a development environment, you can use the `start-dev` command. This will start up a development web server on port 3000, and a nodemon-watched API server on port 3100. These development servers will automatically reload if changes are made to the source.

  - Install dependencies with:

    ```
    yarn
    ```
  
  - Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   
  - Start the development environment:

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

If you would like to run the development tools inside of a docker container, you can set up a local Docker development environment by building the image:

```
docker build -f Dockerfile-tools -t mern:v1 .
```

And running the image:

```
docker run -v ${PWD}:/usr/app -p 3000:3100 -t mern:v1
```

## Kubernetes

You can use Helm and our bundled chart for quickly deploying your application.

### Locally with minikube

You can use minikube for creating a local testing cluster. Start up your cluster:

```
minikube start
```

Make sure you set your Docker environment to use it. This is important so that the cluster has your Docker images.

```
eval $(minikube docker-env)
```

Build your Docker image and give it a tag:

```
docker build -t mern:v1 .
```

Install the Helm chart located in `helm/mern` on to your cluster:

```
helm install helm/mern
```

If using minikube, you will need to add port forwarding to be able to view your application:

```
kubectl port-forward <pod_name> <external_port>:3000

kubectl port-forward mern-deployment-789311257-36s62 32111:3000
```


Open your browser to http://localhost:32111

If you want to update your application, you can build a new image with a new version tag, e.x. `docker build -t mern:v2 .`. Update the version tag in `helm/mern/values.yml`.

Then, roll out a new release with:

```
helm upgrade <deployment_name> helm/mern
helm upgrade limping-bee .
```

### On Bluemix Kubernetes

## Dependencies

  - [axios](https://github.com/mzabriskie/axios) - promise-based HTTP client
  - [foreman](https://github.com/strongloop/node-foreman) - a Procfile-based application utility
  - [mongoose](http://mongoosejs.com/) - mongodb object modelling
  - [express](https://expressjs.com/) - minimalist Node.js framework
  - [react](https://facebook.github.io/react/) - JS library for building user interfaces
