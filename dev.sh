#!/usr/bin/env bash

until nc -z -v -w30 $DB_HOST 5432
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

npm run migrate
npm run seed

exec "$@"
