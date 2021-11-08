# https-node

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt

docker build . -t <your username>/node-web-app

docker build . -t phipex/node-web-app