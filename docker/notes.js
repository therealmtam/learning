/*
DOCKER:
--------

On macOS, Docker containers and images are stored in the Docker for Mac virtual 
machine's file system, rather than directly on your Mac's file system. 
The Docker for Mac application manages this virtual machine and handles 
the container execution.

CONTAINERS:
---------
- containers are instances of an image and refer to the running
 environment where there is a:
  - file system
  - and commonly your code
  - basically like a computer terminal like experience you can
  access
  
IMAGES:
---------  
- images are the pre-built environment that take a base image that
is "published" (published in hub.docker.com) like a "node" environment in a linux box
`FROM node:18-alpine` and do operations like copy the code from your local repo into
an environment where the base environment (in this case a node environment).

To create the image, you need a Dockerfile which is a script that tells docker 
the base environment/image to start with and how to pull your code into that 
environment.

Then you run `docker build -t welcome-to-docker .`

  The -t flag tags your image with a name (welcome-to-docker in this case). 
  And the . lets Docker know where it can find the Dockerfile.

  And the Dockerfile, when it is doing something like copying the code from your
  repository to the output image, is referencing the path relative to it (the Dockerfile)
  where your code and files are.

After you run the `docker build` command, an image is created locally and is tagged with
whatever you named it (ex. welcome-to-docker).

Locally:
  - on Mac, images are stored in the virtural file-system using the Docker app. So after
  running the `docker build` command, you should see the image show up in the Docker desktop app.

  Then you can "publish" your image just like a git hub repo, but instead to your Docker Hub 
  repo ex. => https://hub.docker.com/repositories/maxctam

  To publish your local image to your Docker repository, you first need to:
    - name/tag your local image with your <repository name>/<image name/tag>

      - this is because the `docker push <repository name>/<image name/tag>` command will use
      the name of your repository to find where to place the image

        => it will console > "The push refers to repository [docker.io/maxctam/bare-node-image]"
        where "maxctam" is a part of the path to the repository.

      - if your image does not already have the repository name tagged to it locally,
      then you need to run 
        => `docker tag <image name/tag without repository tag> <repository name>/<image name>`
        ex. => `docker tag bare-node-image maxctam/bare-node-image`

        - this command will locally copy the image under the new name
    
    - then you can run the push command to push to the repository

      ex. => `docker push maxctam/bare-node-image`
 
  To publish to a nested repository such as
  https://hub.docker.com/repository/docker/maxctam/test/general

  ...you need to tag the local image as 
    => `docker tag <image name> <your namespace>/<the nested repo name>:<image name>`
    ex. => `docker tag bare-node-image maxctam/test:bare-node-image`

    => then you can run `docker push maxctam/test:bare-node-image` to get it there

--------
How to PULL images from the Hub
--------

After you've published images, you can easily pull them down using the Docker Desktop app's Hub
tab to see all the images you have created and pushed up.

You can access the library of container images such as https://hub.docker.com/_/postgres
where you can pull it down (just like an open source npm package) by running 
=> `docker pull postgres`

--------
How to reference your own Base Image
--------
You can import your own base image by referencing a public image in the hub
in your local Dockerfile:

ex. `FROM maxctam/bare-node-image:latest`

And you can locally run `docker build` and it will locally build a new image
using the public image as a base.

--------
How to run a docker image locally
--------
1) You can use the commandline:
`docker run -d --name <the name I want to give my container> <my_image ID found using >docker image list`>`

ex.> docker run --name sampleContainer 50b019754682

2) Or you can use the Docker Desktop and click on Images and hit "run" to use the GUI to do it

--------------
DOCKER COMPOSE
--------------
- tutorial https://docs.docker.com/compose/gettingstarted/

- Docker compose will use a `yml` file to compose multiple docker containers
in a single script.

  > `docker compose up` is the command to run in the directory where the
  yml file exists

- see the rest of my notes in the composetest/docker-compose.yml

--------------
PERSISTED VOLUMES
--------------
- see `docker-persisted-volume/Dockerfile` for my notes on this
*/