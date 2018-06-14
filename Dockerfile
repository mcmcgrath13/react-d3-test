# ---------------------Dockerfile used front end-------------------------
FROM node:9.0.0

RUN node -v
RUN npm -v

# ----------------------React Web Apps------------------------------------
# Create app directories
RUN mkdir -p /usr/src/epilepsy_react
WORKDIR /usr/src/epilepsy_react

# Bundle app sources
COPY . /usr/src/epilepsy_react

# install app dependencies
RUN npm install
RUN npm install ajv@^6.0.0
RUN npm install jquery@1.9.1

EXPOSE 3000

# Run server
CMD ["npm", "start"]

## ---------------------- The End -----------------------------------------
