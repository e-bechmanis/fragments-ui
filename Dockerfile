# This file contains instructions to build an image of fragments UI

# Stage 0: Install alpine Linux + node (LTS - 18.14.2) + dependencies
FROM node:18.14.2-alpine3.17@sha256:0d2712ac2b2c1149391173de670406f6e3dbdb1b2ba44e8530647e623e0e1b17 AS dependencies

# metadata about the image
LABEL maintainer="Elena Bechmanis <ebechmanis@myseneca.ca>"
LABEL description="Fragments UI"

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY ./fragments-ui/package*.json ./fragments-ui/

WORKDIR /app/fragments-ui

RUN apk add

RUN yarn install

################################################################################################

# Stage 1: use dependencies to build the site
FROM node:18.14.2-alpine3.17@sha256:0d2712ac2b2c1149391173de670406f6e3dbdb1b2ba44e8530647e623e0e1b17 AS builder

WORKDIR /app

# Copy cached dependencies from previous stage so we don't have to download
COPY --from=dependencies /app /app

# Copy source code into the image
COPY . .

# Navigate in fragments-ui folder
WORKDIR /app/fragments-ui

RUN yarn build

#################################################################################################

FROM nginx:stable-alpine@sha256:2366ede62d2e26a20f7ce7d0294694fe52b166107fd346894e4658dfb5273f9c AS deploy

COPY --from=builder /app/fragments-ui/public ./public
COPY --from=builder /app/fragments-ui/package.json ./package.json
COPY --from=builder /app/fragments-ui/.next ./.next
COPY --from=builder /app/fragments-ui/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "serve"]