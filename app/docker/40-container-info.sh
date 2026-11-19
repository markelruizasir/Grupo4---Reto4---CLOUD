#!/bin/sh
set -eu

# Datos del nodo donde se ejecuta esta tarea
NODE_HOST="${NODE_HOSTNAME:-unknown}"
NODE_ID_VALUE="${NODE_ID:-unknown}"

# Identificar el rol según el hostname
case "$NODE_HOST" in
    manager-*)
        NODE_ROLE="Manager"
        ;;
    worker*)
        NODE_ROLE="Worker"
        ;;
    *)
        NODE_ROLE="Unknown"
        ;;
esac

# Generar información de la réplica y del nodo
printf '{"application":"grupo4-f1","version":"%s","container":"%s","node_hostname":"%s","node_role":"%s","node_id":"%s","public_nodes":{"manager":"%s","worker1":"%s","worker2":"%s","worker3":"%s"}}\n' \
    "${APP_VERSION:-unknown}" \
    "$(hostname)" \
    "$NODE_HOST" \
    "$NODE_ROLE" \
    "$NODE_ID_VALUE" \
    "${PUBLIC_MANAGER_IP:-unknown}" \
    "${PUBLIC_WORKER1_IP:-unknown}" \
    "${PUBLIC_WORKER2_IP:-unknown}" \
    "${PUBLIC_WORKER3_IP:-unknown}" \
    > /usr/share/nginx/html/__container

chmod 644 /usr/share/nginx/html/__container
