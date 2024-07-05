#!/bin/bash
set -e

# Check if the migrations have already been run
if [ ! -f /app/migrations_done ]; then
  echo "Running migrations..."
  npx prisma migrate resolve --applied 20240705065628_init # Replace this with your actual migration command
  npx prisma db push
  touch /app/migrations_done
fi

echo "Starting the application..."
exec "$@"
