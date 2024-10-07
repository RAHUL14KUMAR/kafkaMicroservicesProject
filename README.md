![Untitled-2024-10-07-2255](https://github.com/user-attachments/assets/21f81c0d-c552-47f8-9e03-df68bf736281)


## MICROSERVICES PROJECT

This project consists of multiple microservices, including ``user-service``, ``product-service``, ``order-service``, and an ``api-gateway`` for communication through GraphQL.

## PREREQUISITE

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started/)

- [Node.js](https://nodejs.org/en) (Runs locally)

## STEP TO RUN THE PROJECT LOCALLY

1. #### Clone The Repository

first, clone the repo in your local machine

``` bash

 git clone {{repo_url}}

cd {{repo_folder}}

```

2. Setup MongoDB (Database) Go to MongoDB Atlas and create a new database cluster. After setting up your cluster, create the necessary database and collections. Generate a MongoDB connection URL for each service.

3. Configure Environment Files Each service (user-service, product-service, order-service) requires a .env file for environment-specific configurations.

#### User Service

go to the user-service folder

```` bash
cd user-service
````

Create a .env file and inside it pass the below parametre

```` bash
MONGO_DB_URL=mongodb+srv://<username>:<password>@<cluster-url>/dbname?retryWrites=true&w=majority
RABBITMQ_URL=amqp://<username>:<password>@<broker-url>

JWT_SECRET=<your_jwt_secret>

KAFKA_BROKER=localhost:9092
````

do same for product-serivce ,order-service and api-gateway

4- Install Docker Ensure Docker is installed on your system. You can download Docker from here.

```` bash
docker --version
````

To check if Docker is installed, run:

```` bash
docker --version
````
   
5 -  Running the Microservices Once Docker is installed and your environment files are set up, run the following command from the root directory of the project to build and start all services:

```` bash
docker-compose up
````

This will build the Docker images and spin up the containers for each microservice.

Using the Microservices After the containers have started, you can begin interacting with the microservices through the API Gateway, which exposes a GraphQL endpoint.

6- 
```` bash
cd api-gateway
npm install
npm start
````

By default, the API Gateway should be running on [http://localhost:3000/].

`` for user microservices request ``

```` bash
[http://localhost:3000/user]
````

`` for product microservices request ``

```` bash
[http://localhost:3000/product]
````

`` for order microservices request ``

```` bash
[http://localhost:3000/order]
````
