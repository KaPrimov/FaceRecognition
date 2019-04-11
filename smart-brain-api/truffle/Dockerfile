# FROM node:latest

# # Replace shell with bash so we can source files
# RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# # make sure apt is up to date
# RUN apt-get update --fix-missing
# RUN apt-get install -y curl sudo
# RUN sudo apt-get install -y build-essential libssl-dev

# ENV NVM_DIR /usr/local/nvm
# RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
# ENV NODE_VERSION 8.15.0
# RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

# ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
# ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# RUN apt-get install git python g++ make -y
# RUN npm install -g truffle --unsafe-perm

# RUN mkdir -p /dapp
# WORKDIR /dapp

# EXPOSE 8080
# ENTRYPOINT []


FROM node:8.15.1-jessie

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm install -g truffle@4.1.15

RUN mkdir -p /dapp
WORKDIR /dapp

EXPOSE 8080
ENTRYPOINT []
