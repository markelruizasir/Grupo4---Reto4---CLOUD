#!/usr/bin/env bash

# CLOUD Reto 4 - Grupo 4
# Monitor de balanceo Docker Swarm.
# Consulta la web cada segundo e identifica el contenedor.

set -uo pipefail

BASE_URL="${1%/}"
COUNT="${2:-0}"
INTERVAL="${3:-1}"

if [ -z "$BASE_URL" ]; then
    echo "Uso: $0 http://IP_PUBLICA [CONSULTAS] [INTERVALO]"
    exit 1
fi

i=0

while :; do
    RESULT=$(curl -sS --connect-timeout 5 --max-time 8 \
        -H 'Connection: close' \
        -w $'\nHTTP_CODE:%{http_code}' \
        "$BASE_URL/__container" 2>&1 || true)

    HTTP_CODE=$(printf '%s\n' "$RESULT" |
        sed -n 's/^HTTP_CODE://p' | tail -n 1)

    BODY=$(printf '%s\n' "$RESULT" | sed '/^HTTP_CODE:/d')

    VERSION=$(printf '%s' "$BODY" |
        sed -n 's/.*"version":"\([^"]*\)".*/\1/p')

    CONTAINER=$(printf '%s' "$BODY" |
        sed -n 's/.*"container":"\([^"]*\)".*/\1/p')

    printf '%s | HTTP=%s | VERSION=%s | CONTAINER=%s\n' \
        "$(TZ=Europe/Madrid date '+%H:%M:%S')" \
        "${HTTP_CODE:-000}" "${VERSION:-unknown}" "${CONTAINER:-unknown}"

    i=$((i + 1))

    if [ "$COUNT" -gt 0 ] && [ "$i" -ge "$COUNT" ]; then
        break
    fi

    sleep "$INTERVAL"
done
