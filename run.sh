#!/bin/bash
ocker build -t blottiofrontend .
docker run -it -p 3000:3000 blottiofrontend