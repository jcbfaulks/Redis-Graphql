sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update

curl https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz -o node.tar.xz
sudo tar -C /usr/local --strip-components 1 -xvf node.tar.xz
