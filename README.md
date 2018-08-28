# MERN starter

This starter project provides the base elements needed to create an application using the MERN stack (MongoDB, ExpressJS, a React front end and a Node backend).

## Getting Started

Ensure [IBM Cloud Developer Tools](https://github.com/IBM-Cloud/ibm-cloud-developer-tools) is installed. To install, run:

```
curl -sL http://ibm.biz/idt-installer | bash
```

> *NOTE:* IDT builds and runs the project using Docker containers, the recommended approach for cloud native development. However, direct use of native tools (e.g. npm) is also supported. See the [Native Commands Appendix](#native-commands-appendix) for more information.

## Dev mode vs release mode 

The starter project supports the concept of dev mode and release mode.  In dev mode, the starter app runs with dev dependencies installed and hot reload enabled for both the frontend and backend aspects of the app.  Dev mode is intended for use during app development. Release mode excludes dev dependencies and runs the app without hot reload. Release mode is intended for running in production.

## Working in Dev Mode 

1. Build the project with all dependencies, including dev dependencies, with the command:

    ```
    idt build --debug
    ```    

    > *NOTE:* Ensure a Docker daemon is running before issuing the above command

2. Run project unit tests with the command:

    ```
    idt test
    ```

3. Run the app in dev mode with command:

    ```
    idt shell run-dev &
    ```

    A web server will runs on port 3000 and the app itself runs on port 3100. The web server and app will automatically reload if changes are made to the source.

4. Run the app in interactive debug mode with command:

    ```
    idt debug
    ```

     The app listens on port 5858 for the debug client to attach to it, and on port 3000 for app requests.

## Working in Release Mode 

1. Build the project:

    ```
    idt build
    ```

    This builds the project using `Dockerfile-tools`. Effectively equivalent to `idt build --debug`.

2. Run the project:

    ```
    idt run
    ```

    This runs the project using the release image built on the fly using `Dockerfile`. Hot reload is not available in the release image.

## Project default URLs 

Whether you run in dev mode or release mode, you have the same default URLs available to you: 

1. http://localhost:3000
2. http://localhost:3000/appmetrics-dash
3. http://localhost:3000/health

## Deployment 

These projects are designed for deployment through the IDT CLI to the IBM Cloud, to either Kubernetes (public or private cloud) or Cloud Foundry (public cloud only).  

To deploy the app:

```
idt deploy [--target container]
```

Deploys app to Cloud Foundry by default or to Kubernetes (on IBM Cloud) if you specify the --target option.  

**NOTE:** If you choose the “IBM DevOps, using Cloud Foundry buildpacks” options when you create your project, there is no need to manually deploy the app to Cloud Foundry.

Deployment to other environments is possible using native commands. See the 'Native Commands Appendix' below for further details. 

## Native Commands Appendix 

This section specifies how to use native commands to do development on this project outside of containers and without the IDT CLI.

Note, when running the project with native commands in either dev or release mode, you must provide your own mongo server. See Mongo section below for details.

### Working in Dev Mode 

1. Build the project with all dependencies, including dev dependencies, with the command:

    ```
    npm install
    ```

2. Run the project unit tests with the command:

    ```
    npm test
    ```

3. Run the app in dev mode with the command:

    ```
    npm run dev 
    ```

    A development web server runs on port 3000 and the app itself runs on port 3100.  These web server and app will automatically reload if changes are made to the source.

4. Run the app in interactive debug mode with the command:

    ```
    npm run debug
    ```

    The app listens on port 5858 for the debug client to attach to it, and on port 3000 for app requests.

### Working in Release Mode 

1. Build the project:

    ```
    npm install --only=dev; npm run build; npm prune --production
    ```

    Upon completion, webpack has been run and dev dependencies removed.

2. Run the project:

    ```
    npm start
    ```

    Runs app in release mode. App listens on port 3000. Hot reload is not available in this mode.

**NOTE:** Since this project connects to a running Mongo server, you must provide one when working with native commands.  Install instructions are here: https://docs.mongodb.com/manual/administration/install-community/
 
### Mongo Configuration

The project's access to Mongo is controlled through these environment variables with their default values shown:

```
MONGO_URL='localhost:27017';
MONGO_USER='';
MONGO_PASS='';
MONGO_DB_NAME='';
```

To make configuration changes, edit the [server/routers/mongo.js](server/routers/mongo.js) file.

## Other Environment Deployments

You can install and run your app on bare metal or virtual machine environments conventionally: 

```
1. delete node_modules 
2. create app archive (e.g. zip up directory)
3. copy to target machine
4. unwind (e.g. unzip archive) 
5. npm install
6. npm start 
```

You can deploy to Cloud Foundry using: 
```
cf push 
```

You can deploy to Kubernetes using: 

```
1. docker build -p 3000:3000 --name <name> . 
2. publish image to target registry (e.g. dockerhub)
2. helm install chart/<project name>
```

For Helm deployment, make sure to review variables.yaml in your project's chart to ensure suitable values for your deployment, including your image name and location. 

### Running application

Once you have deployed your application successfully into your Kubernetes cluster. You can test your application by retrieving the IP address of your worker nodes.

1. Run the following command to find out what is the public address of your worker nodes

```
$ bx cs workers <clusterName>
```

2. To get the port for your particular application run the following command

```
$ kubectl get services
```

**Note:** In the column labeled ports you will see two numbers and the protocol (TCP/UDP) The port number on the left is the internal / guest port from the container. The port number on the right is the external port that you will use to access your application.

3. Once you have your public IP address and port enter that in your browser to view your application.

#### Kubernetes 

Once you have deployed your application successfully into your Kubernetes cluster. You can test your application by retrieving the IP address of your worker nodes using the Bluemix CLI. Make sure you that you are logged into your cluster.

1. To get the port for your particular application run the following command

```
$ bx cs workers <clusterName>
``` 

2. To get the port for your particular application run the following command
```
$ kubectl get services
```

**Note:** In the column labeled ports you will see two numbers and the protocol (TCP/UDP) The port number on the left is the internal / guest port from the container. The port number on the right is the external port that you will use to access your application.

3. Once you have your public IP address and port enter that in your browser to view your application.

## Using Mongo in Cloud Foundry for your application

Once you are comfortable using your Mongo instance in Kubernetes you can import the credentials of Mongo instance provided by Compose in Cloud Foundry. 

If you have created your instance and setup your credentials, skip to [Environments in Helm Charts], otherwise continue forward.

### Creating an MongoDB Instance 

*  Create an instance MongoDB by searching **compose for MongoDB** in the [Catalog](https://console.stage1.bluemix.net/catalog/)  

* Go to your Dashboard and select the MongoDB instance that you have created

### Retrieve Credentials 
* Go to Credentials and set your credentials.
   * You can also import your credentials by clicking on `Choose File` and include your service-specific configuration 
* Copy the `uri` and the `ca_certificate_base64` onto your clipboard.

You will need to seperate the `username` and `password` from the `uri`. The uri in in the form of `https://{username}:{password}@example.net` 

### Set your Helm Charts     

### values.yml

* Open up `values.yml` under your charts directory (e.g. `chart/project/`)
* Set up the values that will be referenced in your mongo environments. 


```yaml
services:
  mongo:
     url: {uri}
     dbName: {dbname} 
     ca: {ca_certificate_base64}
     username: {username}
     password: {password}
     env: production
     
```
### bindings.yml

* Add the MONGO environment variables references at the end if they are not there already

```ymal
  - name: MONGO_URL
    value: {{ .Values.services.mongo.url }}
  - name: MONGO_DB_NAME
    value: {{ .Values.services.mongo.name }}
  - name: MONGO_USER
    value: {{ .Values.services.mongo.username }}
  - name: MONGO_PASS
    value: {{ .Values.services.mongo.password }}
  - name: MONGO_CA
    value: {{ .Values.services.mongo.ca }}

```

### Secrets (Optional)

If you prefer to not expose your credentials in your `deployment.yml` or `values.yml` you can use a base64 encoded string of your credentials. Using secrets is beyond the scope of this 
README. You can find out how to use secretes in your application by reviewing the links below.

* [Creating a Secret Using kubectl create secret](https://kubernetes.io/docs/concepts/configuration/secret/#creating-your-own-secrets)
* [Encyrption Config](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)


## Configure Mongoose (MongoDB Node) Client

* Open  `server/routers/mongo.js`
* Edit the MONGO environment variables

```js
  const mongoURL = process.env.MONGO_URL || 'localhost';
  const mongoUser = process.env.MONGO_USER || '';
  const mongoPass = process.env.MONGO_PASS || '';
  const mongoDBName = process.env.MONGO_DB_NAME || 'comments';
  const mongoCA = [new Buffer(process.env.MONGO_CA || '', 'base64')] 
```

* Add SSL configurations

```js
  const options = {
      useMongoClient: true,
      ssl: true,
      sslValidate: true,
      sslCA: mongoCA,
      poolSize: 1,
      reconnectTries: 1
  };
```

## Deploy your application

* Use **bx dev** and follow the instructions
```bash
$ bx dev deploy [--target container]
```

* Use **idt** and follow the instructions 
```bash
$ idt deploy [--target container]
```
