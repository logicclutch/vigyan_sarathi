#!/bin/sh
# Serve the latest published release when one exists; fall back to the build baked into the image.
set -e
ROOT=/usr/share/nginx/html
if [ -f /srv/releases/current/index.html ]; then
  ROOT=/srv/releases/current
fi
sed "s#__ROOT__#$ROOT#g" /etc/nginx/templates/vigyan-sarathi.conf.tpl > /etc/nginx/conf.d/vigyan-sarathi.conf
echo "[web] serving $ROOT"
exec nginx -g 'daemon off;'
