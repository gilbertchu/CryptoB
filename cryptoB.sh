#!/bin/bash
cd "$(dirname "$(realpath "$0")")"
# For older versions of nvm:
type node 1> /dev/null 2>&1
if [ $? -eq 1 ]; then
  echo "warning: init nvm" 1>&2
  . "$NVM_DIR"/nvm.sh
fi
cat | ./cryptoB.js.sh "${@}"
