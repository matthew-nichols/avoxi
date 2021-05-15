FROM node:14

RUN mkdir /opt/avoxi

WORKDIR /opt/avoxi

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

# --production: only install production depencies
# --frozen-lockfile: fail if the lockfile is unusable or not reproducible
RUN yarn install --production --frozen-lockfile

COPY GeoLite2 ./GeoLite2
# install dependencies before copying source code so that
# we don't have to reinstall dependencies every time (use Docker cache)
COPY src ./src

EXPOSE 3000

CMD ["yarn", "start"]
