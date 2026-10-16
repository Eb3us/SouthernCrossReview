#!/bin/bash

FILE=$1

cat $FILE | grep category | cut -d '>' -f 2 | cut -d '<' -f 1
