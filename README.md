# eve2
New EVE using ionic

## Develop

1- Clone the repo

2- Execute `./dev build` to build the docker image

3- Execute `./dev enter` to run the development environment into an attached tmux session

4- You can access the server on http://localhost:8100 . The changes are auto reloaded :)

The directory `src` is mapped inside the doker containter to `/home/user/app` directory, so you can change anything on your local filesystem, and the changes will be inmediately availabe inside the docker container

Inside the tmux session, you have two windows: the `layout` one, that runs the gulp development task and the `ionic` window, that runs the ionic server. You can move between windows using `CTRL+B n` (next) and `CTRL+B p` (prev) or using directly `CTRL+B WINDOW-INDEX`, being `WINDOW-INDEX` 0 or 1
