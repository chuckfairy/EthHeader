#!/bin/bash

#npm install uglify-js -g

uglifyjs --compress --mangle -- ./src/EthHeader.js > ./dist/EthHeader.min.js

#npm i -g clean-css-cli

cleancss ./css/EthHeader.css > ./dist/EthHeader.min.css
