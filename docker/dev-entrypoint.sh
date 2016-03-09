#!/bin/bash

tmux -2 new-session -d -s eve

tmux new-window -t eve:1 -n 'ionic'
tmux select-window -t eve:1
tmux send-keys -t eve 'cd app' C-m
tmux send-keys -t eve 'ionic serve' C-m

tmux rename-window -t eve:0 'layout'
tmux select-window -t eve:0
tmux send-keys -t eve 'cd app' C-m
tmux send-keys -t eve 'npm install && gulp' C-m

tmux -2 attach-session -t eve
