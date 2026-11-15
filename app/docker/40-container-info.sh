#!/bin/sh
set -eu

printf '{"application":"grupo4-f1","version":"%s","container":"%s"}\n' \
    "${APP_VERSION:-unknown}" "$(hostname)" \
    > /usr/share/nginx/html/__container

chmod 644 /usr/share/nginx/html/__container
