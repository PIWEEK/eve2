# eve2
New EVE using ionic

## Develop

1- Clone the repo

2- Execute `./dev build` to build the docker image

3- Execute `./dev enter` to run the development environment into an attached tmux session

4- You can access the server on http://localhost:8100 . The changes are auto reloaded :)

The directory `src` is mapped inside the doker containter to `/home/user/app` directory, so you can change anything on your local filesystem, and the changes will be inmediately availabe inside the docker container
