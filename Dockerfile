FROM ibmcom/ibmnode

WORKDIR "/app"

# Install app dependencies
COPY package.json /app/
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'
RUN cd /app; npm install --production
COPY /src /app/src/
RUN npm install --only=dev; npm run build; npm prune --production

COPY . /app

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
CMD ["npm", "start"]
