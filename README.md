# CLOUD Reto 4 — Web en clúster Docker Swarm sobre AWS

## 1. Descripción del proyecto

Proyecto del grupo 4 de 2.º ASIR para la asignatura CLOUD.

El objetivo es desplegar una aplicación web para un evento de Fórmula 1 en una infraestructura AWS, utilizando Terraform para aprovisionar los servidores y Docker Swarm para gestionar los contenedores.

El proyecto demuestra balanceo de carga, escalabilidad, autorreparación y alta disponibilidad.

## 2. Arquitectura

La infraestructura utiliza cuatro instancias EC2 en AWS, región `us-east-1`:

- **manager-g4:** manager principal del clúster.
- **worker1-g4:** worker.
- **worker2-g4:** worker.
- **worker3-g4:** worker.

La configuración final consta de un manager y tres workers. La comunicación interna de Docker Swarm utiliza las IP privadas de las instancias.

La red overlay de la aplicación es `red-app-g4`. La red ingress personalizada utiliza MTU 1450.

## 3. Tecnologías utilizadas

- Git y GitHub: control de versiones y colaboración.
- GitHub Codespaces: entorno de desarrollo y administración.
- AWS CLI: gestión de los recursos de AWS.
- Terraform: infraestructura como código.
- Amazon EC2: máquinas virtuales.
- SSH: administración remota segura.
- Docker Engine: ejecución de contenedores.
- Docker Swarm: orquestación y alta disponibilidad.
- Nginx: servidor web de la aplicación.

## 4. Estructura del repositorio

| Directorio / archivo | Función |
|---|---|
| `.devcontainer/` | Configuración de GitHub Codespaces. |
| `terraform/` | Infraestructura AWS, variables, salidas y arranque automático. |
| `app/` | Dockerfile, configuración Nginx y web original. |
| `config/` | Configuración y acceso SSH. |
| `scripts/` | Scripts de comprobación y monitorización. |
| `diagramas/` | Arquitectura del proyecto. |
| `practica-individual/` | Documentación de la práctica individual. |
| `capturas/` | Evidencias de las fases del proyecto. |
| `README.md` | Presentación e instrucciones generales. |
| `proyecto.md` | Informe técnico de las fases 0 a 5. |
| `gestion.md` | Reparto de tareas y reflexión del equipo. |

## 5. Entorno de trabajo

El entorno principal se ejecuta mediante GitHub Codespaces y utiliza un Dev Container configurado con AWS CLI y Terraform.

Las credenciales de AWS se introducen durante la sesión y no se guardan en el repositorio.

## 6. Infraestructura con Terraform

La infraestructura se define mediante código en el directorio `terraform/`.

Comandos principales:

- `terraform init`
- `terraform fmt -check`
- `terraform validate`
- `terraform plan`

La creación y modificación de recursos se realiza con `terraform apply`, después de revisar el plan generado.

Las variables locales y los archivos de estado de Terraform no se versionan.

## 7. Acceso SSH

Los cuatro servidores se administran mediante claves SSH propias.

Se utiliza un archivo de configuración SSH para acceder mediante nombres cortos. Los workers se alcanzan por sus IP privadas utilizando el manager como salto.

## 8. Despliegue de la aplicación

La imagen propia de la aplicación está publicada en Docker Hub:

**Repositorio:** https://hub.docker.com/r/markelasir/grupo4-f1

Versiones publicadas:

- `markelasir/grupo4-f1:1.0`
- `markelasir/grupo4-f1:2.0`

El servicio Docker Swarm se denomina `grupo4-f1` y utiliza cuatro réplicas, conectadas a la red overlay de la aplicación y publicadas en el puerto 80.

Para consultar su estado: `docker service ls` y `docker service ps grupo4-f1`.

La aplicación se puede consultar mediante la IP pública de cualquiera de los cuatro nodos.

## 9. Pruebas de orquestación

Durante el proyecto se han realizado pruebas de:

- Balanceo de carga.
- Escalado de réplicas a 8, 12 y 2.
- Autorreparación al eliminar un contenedor.
- Alta disponibilidad ante la caída de un worker.
- Recuperación y reincorporación de nodos.
- Mantenimiento mediante `drain` y reactivación.
- Actualización de la versión 1.0 a la 2.0 y rollback.
- Alta disponibilidad de managers mediante elección de un nuevo líder.

Los resultados y las evidencias se recogen en `proyecto.md` y en el directorio `capturas/`.

## 10. Seguridad

El repositorio excluye credenciales, claves privadas, archivos de variables sensibles y estados de Terraform mediante `.gitignore`.

No deben subirse al repositorio credenciales de AWS, claves privadas SSH, archivos `.tfstate`, archivos `terraform.tfvars` ni tokens de acceso.

## 11. Documentación

- **`proyecto.md`:** informe técnico detallado de las fases 0 a 5.
- **`gestion.md`:** reparto de tareas, responsables y reflexión del equipo.
- **`capturas/`:** evidencias de las configuraciones y pruebas realizadas.
