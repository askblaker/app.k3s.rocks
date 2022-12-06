#!/bin/bash

yarn lint
yarn run prettier -c .
yarn build
yarn test