#!/usr/bin/env bash

npm run migrate
npm run seed

exec "$@"
