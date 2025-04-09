#!/bin/sh

# wait-for-mysql.sh
echo "⏳ Waiting for MySQL at $DB_HOST:$DB_PORT..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "❌ MySQL not ready yet..."
  sleep 2
done

echo "✅ MySQL is up — starting the server!"
exec "$@"
