FROM redis:alpine

# this simple docker file just runs a redis instance that is not exposed (because exposure of a port is done using `docker run` or `docker compose` which is the step after building the image which is what this Dockerfile is used for only)

# when `docker run` is run on the image that this file creates, it will create a `volume` in the Docker Desktop which is persisted with the container. So as long as the container instance is not deleted, there is a persisted closed data store.

# NOTE: In a Dockerfile, you cannot directly expose ports because port exposure is typically handled when running the container using the docker run or docker-compose.yml file. However, you can specify the default port that your Redis server inside the container listens on using the EXPOSE instruction in the Dockerfile.


