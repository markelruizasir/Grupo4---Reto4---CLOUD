# CLOUD Reto 4 — Informe técnico

# Fase 0. Entorno de trabajo colaborativo y cliente remoto

## 1. Creación del repositorio GitHub

El primer paso del proyecto ha sido crear un repositorio privado en GitHub, que actuará como punto central de almacenamiento y coordinación del trabajo.

Se han realizado las siguientes operaciones:

- Creación del repositorio privado.
- Creación inicial del archivo `README.md`.
- Incorporación de un `.gitignore` con reglas para Terraform.
- Invitación de los integrantes del grupo.
- Invitación del profesor para que pueda acceder al proyecto.

El repositorio centraliza el código, los archivos de configuración, los scripts y la documentación.

## 2. Configuración de GitHub Codespaces

Se ha creado un entorno de desarrollo mediante GitHub Codespaces asociado al repositorio.

Para configurar el entorno se ha utilizado un Dev Container, definido mediante el archivo:

`/.devcontainer/devcontainer.json`

Se ha seleccionado una imagen base Ubuntu y se han añadido las siguientes herramientas:

- **AWS CLI:** permite administrar los servicios de Amazon Web Services desde la terminal.
- **Terraform:** permite definir y aprovisionar la infraestructura mediante código.
- **Extensión HashiCorp Terraform:** proporciona soporte para Terraform en Visual Studio Code.

También se ha configurado `postCreateCommand` para ejecutar automáticamente comprobaciones de las versiones de AWS CLI y Terraform después de crear el entorno.

### 2.1. Comprobación del entorno

Una vez creado el Codespace, se ha abierto una terminal y se han ejecutado los siguientes comandos:

```bash
aws --version
terraform version
git --version
```

También se ha comprobado el directorio de trabajo mediante:

```bash
pwd
ls -la
```

**Resultado:** las tres herramientas funcionan correctamente y el Codespace está trabajando sobre el repositorio del proyecto.

### 2.2. Evidencia del entorno

capturas/fase0/codespace_funcionando.png

- Prueba realizada: comprobación de AWS CLI, Terraform, Git y directorio de trabajo.
- Resultado: las herramientas están instaladas y disponibles.
- Autores: grupo 4.

## 3. Organización del repositorio

Se ha creado una estructura de directorios para separar los distintos componentes del proyecto.

| Directorio | Función |
|---|---|
| `.devcontainer/` | Configuración del entorno Codespaces. |
| `terraform/` | Código para aprovisionar la infraestructura AWS. |
| `app/` | Aplicación web, Dockerfile e imágenes. |
| `config/` | Configuraciones relacionadas con SSH. |
| `scripts/` | Scripts de automatización y comprobación. |
| `diagramas/` | Diagramas de arquitectura. |
| `practica-individual/` | Documentación de la práctica individual. |
| `capturas/` | Evidencias gráficas del proyecto. |

También se han creado los documentos principales:

- `README.md`: presentación general del proyecto.
- `proyecto.md`: informe técnico de las fases de desarrollo.
- `gestion.md`: reparto de tareas y reflexión del equipo.

## 4. Preparación del trabajo colaborativo

Se ha establecido GitHub como plataforma principal para la colaboración entre los integrantes.

El desarrollador principal utiliza GitHub Codespaces como entorno de trabajo, mientras que el resto de integrantes puede utilizar terminales Linux, WSL o Git Bash desde sus propios equipos.

Se ha definido el siguiente flujo de trabajo:

1. Clonar el repositorio.
2. Configurar la identidad de Git.
3. Crear una rama independiente.
4. Realizar las modificaciones correspondientes.
5. Registrar los cambios mediante commits.
6. Subir la rama al repositorio remoto.
7. Crear un Pull Request hacia `main`.
8. Revisar e integrar los cambios.

Las evidencias de los commits y Pull Requests realizados por los integrantes se incorporarán en este apartado conforme avance el trabajo colaborativo.
# Fase 1. Infraestructura con Terraform en AWS

## 1. Organización del código

La infraestructura se ha definido mediante Terraform dentro del directorio `terraform/`, separando las responsabilidades en diferentes archivos:

| Archivo | Función |
|---|---|
| `providers.tf` | Configuración del proveedor AWS y región de despliegue. |
| `variables.tf` | Variables y validaciones del proyecto. |
| `main.tf` | Creación de las instancias EC2. |
| `security_group.tf` | Reglas de seguridad y comunicación. |
| `outputs.tf` | Información de las instancias desplegadas. |
| `user_data.sh` | Configuración automática de los servidores. |
| `terraform.tfvars` | Valores concretos de las variables locales. |

El proveedor AWS está configurado para trabajar en la región `us-east-1`, correspondiente al entorno AWS Academy Learner Lab.

## 2. Definición de variables

Se han definido variables para parametrizar la infraestructura y evitar valores fijos innecesarios.

Entre ellas destacan:

- `numero_grupo`: identifica al grupo de trabajo.
- `ami_id`: identifica la imagen Ubuntu Server 22.04.
- `instance_type_manager`: tipo de instancia del manager (`t3.medium`).
- `instance_type_worker`: tipo de instancia de los workers (`t3.small`).
- `manager_disk_size`: almacenamiento del manager (20 GB).
- `worker_disk_size`: almacenamiento de cada worker (10 GB).
- `ssh_allowed_cidr`: rango CIDR autorizado para el acceso SSH desde Codespaces.

La variable `numero_grupo` comprueba que el valor contiene únicamente números.

La variable `ssh_allowed_cidr` valida el formato CIDR y evita permitir el acceso SSH desde `0.0.0.0/0`.

## 3. Creación de las instancias EC2

Se han definido dos recursos principales:

### Manager

Se utiliza el recurso `aws_instance.manager` para crear el servidor principal del clúster.

Sus características son:

- Nombre: `manager-g4`.
- Tipo: `t3.medium`.
- Disco: 20 GB de tipo gp3.
- IP pública asignada.
- Security Group compartido con los workers.

### Workers

Se utiliza el recurso `aws_instance.workers` con `count = 3`.

De esta manera se crean los tres workers mediante una única definición de recurso, evitando duplicar el código Terraform.

Sus características son:

- `worker1-g4`.
- `worker2-g4`.
- `worker3-g4`.
- Tipo: `t3.small`.
- Disco: 10 GB de tipo gp3 por instancia.
- IP pública asignada.
- Security Group compartido con el manager.

Los recursos incorporan etiquetas para identificar su nombre, función, grupo y proyecto.

## 4. Configuración automática mediante User Data

El archivo `user_data.sh` se ejecuta durante la inicialización de cada instancia EC2.

El script realiza las siguientes operaciones:

1. Activa el registro de la ejecución y utiliza `set -Eeuo pipefail` para detectar errores.
2. Configura el hostname correspondiente a cada servidor.
3. Establece la zona horaria `Europe/Madrid`.
4. Crea el directorio `.ssh` del usuario `ubuntu`.
5. Incorpora las claves públicas propias en `authorized_keys`, evitando duplicados.
6. Configura los permisos del directorio SSH y del archivo `authorized_keys`.
7. Instala las dependencias necesarias.
8. Añade el repositorio oficial de Docker.
9. Instala Docker Engine, Docker CLI, containerd y los complementos Buildx y Compose.
10. Habilita e inicia el servicio Docker.
11. Añade el usuario `ubuntu` al grupo `docker`.
12. Realiza comprobaciones finales de versiones y estado del servicio.

En los recursos EC2 se mantiene configurada la pareja de claves `vockey` mediante `key_name`, mientras que las claves públicas propias se incorporan también mediante el script de inicialización en `authorized_keys`.

## 5. Configuración del Security Group

Se ha creado un único Security Group para los cuatro servidores mediante `aws_security_group.cluster`.

Las reglas permiten:

| Puerto / protocolo | Origen | Finalidad |
|---|---|---|
| TCP 22 | CIDR autorizado | Administración SSH desde Codespaces. |
| TCP 22 | Security Group del clúster | Comunicación SSH interna. |
| TCP 80 | Internet | Acceso público a la web. |
| TCP 8080 | Internet | Acceso al puerto web alternativo. |
| TCP 2377 | Security Group del clúster | Control de Docker Swarm. |
| TCP 7946 | Security Group del clúster | Descubrimiento de nodos. |
| UDP 7946 | Security Group del clúster | Descubrimiento de nodos. |
| UDP 4789 | Security Group del clúster | Tráfico overlay mediante VXLAN. |
| ICMP | Security Group del clúster | Comprobaciones de conectividad entre nodos. |

También se ha definido una regla de salida IPv4 para permitir la comunicación con servicios externos y la descarga de actualizaciones.

## 6. Salidas de Terraform

El archivo `outputs.tf` devuelve información de las instancias creadas.

Para el manager y cada worker se muestran:

- Identificador de instancia EC2.
- Dirección IPv4 pública.
- Dirección IPv4 privada.

Estas salidas permiten identificar los servidores y utilizar sus direcciones en las configuraciones SSH y Docker Swarm.

## 7. Validación y planificación

Antes de aplicar cambios en AWS se utilizan los siguientes comandos:

    terraform fmt -check
    terraform validate
    terraform plan

- `terraform fmt -check`: comprueba el formato de los archivos Terraform.
- `terraform validate`: comprueba la sintaxis y coherencia de la configuración.
- `terraform plan`: muestra los cambios que Terraform propone realizar antes de aplicarlos.

Durante el desarrollo se revisaron los planes generados, teniendo en cuenta que las direcciones públicas de EC2 pueden cambiar cuando las instancias se detienen y vuelven a arrancar.

También se revisaron las modificaciones de configuración de las instancias antes de aplicar cambios, evitando realizar un despliegue completo innecesario cuando solo era preciso actualizar una regla concreta de seguridad.

## 8. Seguridad y estado de Terraform

Los archivos locales que contienen valores de configuración y estado no deben publicarse en GitHub.

Para ello se han incluido reglas en `.gitignore` que excluyen:

- Directorios `.terraform/`.
- Archivos `*.tfstate`.
- Archivos `*.tfvars`.
- Credenciales de AWS.
- Claves privadas SSH.
- Archivos de entorno `.env`.

De esta forma se mantiene el código de infraestructura versionado sin publicar información sensible.


# Fase 2. Acceso remoto por SSH

## 1. Clave SSH propia

Se ha utilizado una clave SSH propia de tipo Ed25519 para administrar los cuatro servidores.

La clave privada se conserva localmente en:

`~/.ssh/cloud_reto4_ed25519`

La clave pública se ha instalado en los cuatro nodos, dentro de `authorized_keys`, mediante la inicialización de Terraform.

Se ha comprobado que la huella de la clave pública coincide en los cuatro servidores.

## 2. Agente SSH

Para utilizar la clave durante la sesión se ha empleado `ssh-agent`:

    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/cloud_reto4_ed25519

De esta forma se carga la identidad una vez y se utiliza en las conexiones posteriores.

## 3. Configuración de alias

Se ha configurado el archivo local `~/.ssh/config` para acceder mediante los nombres cortos:

- `manager-g4`
- `worker1-g4`
- `worker2-g4`
- `worker3-g4`

La configuración utiliza el usuario `ubuntu` y la clave propia.

Se ha creado una plantilla reproducible en `config/ssh_config.example`, sin incluir claves privadas ni credenciales.

## 4. Acceso a los workers mediante ProxyJump

Los workers se administran utilizando sus direcciones IP privadas y el manager como salto SSH.

| Nodo | IP privada |
|---|---|
| manager-g4 | 172.31.20.79 |
| worker1-g4 | 172.31.22.73 |
| worker2-g4 | 172.31.27.190 |
| worker3-g4 | 172.31.21.56 |

La opción `ProxyJump manager-g4` permite alcanzar los workers a través del manager.

## 5. Seguridad SSH

Se han comprobado los permisos locales:

- `~/.ssh/config`: 600.
- `~/.ssh/cloud_reto4_ed25519`: 600.

También se ha consultado la configuración efectiva de SSH en los cuatro servidores:

| Parámetro | Valor |
|---|---|
| `permitrootlogin` | `no` |
| `passwordauthentication` | `no` |
| `pubkeyauthentication` | `yes` |

La autenticación mediante clave pública está habilitada, mientras que el acceso SSH directo como root y mediante contraseña están deshabilitados.

## 6. Pruebas de conexión

Se ha comprobado el acceso SSH individual a los cuatro nodos.

Todos han devuelto el hostname correcto y el usuario `ubuntu`:

| Nodo | Resultado |
|---|---|
| manager-g4 | Correcto |
| worker1-g4 | Correcto |
| worker2-g4 | Correcto |
| worker3-g4 | Correcto |

También se han realizado pruebas de ejecución de órdenes simultáneas y transferencia de archivos mediante SCP.

Resultado: los cuatro servidores son administrables mediante la clave SSH propia.


# Fase 3. Configuración del clúster Docker Swarm

## 1. Instalación y comprobación de Docker

Docker Engine se ha instalado automáticamente en los cuatro servidores mediante el script `user_data.sh` de Terraform.

Se ha comprobado la versión y el estado del servicio en cada nodo:

- Versión: Docker 29.9.3.
- Servicio Docker: `active`.

Los cuatro servidores ejecutan Docker correctamente.

## 2. Conectividad mediante IP privada

La comunicación interna del clúster utiliza las direcciones privadas de AWS.

Desde el manager se han realizado pruebas ICMP hacia los tres workers:

| Destino | IP privada | Resultado |
|---|---|---|
| worker1-g4 | 172.31.22.73 | 0 % de pérdida |
| worker2-g4 | 172.31.27.190 | 0 % de pérdida |
| worker3-g4 | 172.31.21.56 | 0 % de pérdida |

Las pruebas han confirmado conectividad entre los nodos mediante la red privada.

## 3. Inicialización de Docker Swarm

Docker Swarm se ha inicializado en `manager-g4` utilizando su dirección IP privada:

`172.31.20.79`

La dirección privada permite que los nodos se comuniquen dentro de la red de AWS sin depender de las direcciones públicas.

## 4. Configuración de la red ingress y MTU

Se ha creado una red ingress overlay personalizada denominada:

`red-g4`

Sus características verificadas son:

- Driver: `overlay`.
- Scope: `swarm`.
- MTU: `1450`.

La reducción de MTU tiene como finalidad adaptar el tamaño de los paquetes al tráfico encapsulado de la red overlay VXLAN.

## 5. Incorporación y estado de los nodos

Se han incorporado cuatro servidores al clúster:

| Nodo | Estado | Función |
|---|---|---|
| manager-g4 | Ready / Active | Manager líder |
| worker1-g4 | Ready / Active | Worker |
| worker2-g4 | Ready / Active | Worker |
| worker3-g4 | Ready / Active | Worker |

Se ha comprobado mediante `docker node ls` que los cuatro nodos permanecen disponibles y conectados.

La configuración final contiene un único manager, que actúa como líder, y tres workers.

## 6. Red overlay propia para la aplicación

Además de la red ingress personalizada, se ha creado una red overlay propia para los servicios:

`red-app-g4`

La inspección de Docker ha confirmado:

- Nombre: `red-app-g4`.
- Driver: `overlay`.
- Scope: `swarm`.

Esta red permite la comunicación de los contenedores desplegados como servicios de Docker Swarm.

## 7. Resultado de la fase 3

Se han verificado los requisitos C1, C2, C3 y C4:

- Docker instalado y activo en los cuatro nodos.
- Conectividad privada entre servidores.
- Clúster inicializado mediante IP privada y MTU 1450.
- Cuatro nodos Ready y Active.
- Un manager líder y tres workers.
- Red overlay propia para la aplicación.

Resultado: clúster Docker Swarm operativo.

