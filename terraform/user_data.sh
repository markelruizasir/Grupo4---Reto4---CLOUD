#!/bin/bash

# INICIO Y REGISTRO DE LA EJECUCION

set -Eeuo pipefail

exec > >(tee -a /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1

echo "INICIO DE CONFIGURACION DEL NODO"

# 1. CONFIGURAR HOSTNAME

hostnamectl set-hostname "${hostname}"

echo "Hostname configurado: ${hostname}"

# 2. CONFIGURAR ZONA HORARIA

timedatectl set-timezone Europe/Madrid

echo "Zona horaria configurada: Europe/Madrid"

# 3. CONFIGURAR CLAVES PUBLICAS SSH

install -d -m 700 -o ubuntu -g ubuntu /home/ubuntu/.ssh

touch /home/ubuntu/.ssh/authorized_keys

while IFS= read -r public_key; do

    if [ -z "$public_key" ]; then
        continue
    fi

    if ! grep -qxF "$public_key" /home/ubuntu/.ssh/authorized_keys; then
        printf '%s\n' "$public_key" >> /home/ubuntu/.ssh/authorized_keys
    fi

done <<'PUBLIC_KEYS'
${ssh_public_keys}
PUBLIC_KEYS

chown -R ubuntu:ubuntu /home/ubuntu/.ssh
chmod 700 /home/ubuntu/.ssh
chmod 600 /home/ubuntu/.ssh/authorized_keys

echo "Configuracion de claves SSH finalizada"

# 4. INSTALAR DOCKER

echo "Instalando dependencias..."

apt-get update -y

apt-get install -y ca-certificates curl

# Añadir clave GPG oficial de Docker

install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc

chmod a+r /etc/apt/keyrings/docker.asc

# Añadir repositorio oficial de Docker

cat > /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

# Actualizar repositorios

apt-get update -y

# Instalar Docker Engine y complementos

DEBIAN_FRONTEND=noninteractive apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin

# Activar Docker automaticamente

systemctl enable --now docker

# Permitir al usuario ubuntu utilizar Docker

usermod -aG docker ubuntu

# 5. COMPROBACIONES FINALES

docker --version

docker compose version

systemctl is-active docker

echo "CONFIGURACION FINALIZADA"


