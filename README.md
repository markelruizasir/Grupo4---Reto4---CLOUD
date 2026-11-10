# CLOUD Reto 4 — Web en clúster Docker Swarm sobre AWS

## 1. Descripción del proyecto

Proyecto del grupo 4 del Reto 4 de la asignatura CLOUD de 2.º ASIR.

El objetivo es desplegar en AWS una aplicación web desarrollada para un evento de Fórmula 1, utilizando Terraform para aprovisionar la infraestructura y Docker Swarm para gestionar un clúster de contenedores.

Se busca conseguir un sistema con balanceo de carga, escalabilidad, autorreparación y alta disponibilidad.

## 2. Arquitectura

La infraestructura estará formada por cuatro instancias EC2 en AWS:

- **1 Manager:** nodo encargado de gestionar el clúster Docker Swarm.
- **3 Workers:** nodos encargados de ejecutar las réplicas de la aplicación.

La comunicación interna del clúster utilizará las direcciones IP privadas de las instancias.

**Región AWS:** `us-east-1` (Learner Lab).

## 3. Tecnologías utilizadas

- Git y GitHub: control de versiones y trabajo colaborativo.
- GitHub Codespaces: entorno de desarrollo principal.
- AWS CLI: administración de los servicios AWS.
- Terraform: aprovisionamiento de infraestructura como código.
- Amazon EC2: servidores de la infraestructura.
- SSH: administración remota de los nodos.
- Docker: contenedores e imágenes de la aplicación.
- Docker Swarm: orquestación y gestión del clúster.

## 4. Estructura del repositorio

| Directorio / archivo | Descripción |
|---|---|
| `.devcontainer/` | Configuración de GitHub Codespaces. |
| `terraform/` | Código de infraestructura AWS. |
| `app/` | Aplicación web, Dockerfile y versiones. |
| `config/` | Configuraciones SSH. |
| `scripts/` | Scripts de automatización y comprobación. |
| `diagramas/` | Diagramas de arquitectura. |
| `practica-individual/` | Documentación de la práctica individual. |
| `README.md` | Presentación del proyecto. |
| `proyecto.md` | Informe técnico de las fases 0 a 5. |
| `gestion.md` | Reparto de tareas y reflexión del equipo. |

## 5. Preparación del entorno

El entorno principal de desarrollo se ejecuta mediante GitHub Codespaces.

El Dev Container incluye:

- AWS CLI.
- Terraform.
- Extensión de Terraform para Visual Studio Code.

Los colaboradores utilizan Git desde sus propios entornos Linux, WSL o Git Bash.

## 6. Despliegue

**Estado: pendiente de completar.**

En este apartado se incorporarán las instrucciones necesarias para:

1. Configurar el acceso a AWS.
2. Aprovisionar la infraestructura mediante Terraform.
3. Acceder a los servidores mediante SSH.
4. Configurar el clúster Docker Swarm.
5. Desplegar la aplicación web.

Las instrucciones definitivas se añadirán conforme se completen las distintas fases del proyecto.

## 7. Docker Hub

**Estado: pendiente de completar.**

- Imagen versión 1.0: pendiente.
- Imagen versión 2.0: pendiente.

Se incorporarán los enlaces a las imágenes publicadas en Docker Hub.

## 8. Documentación

El proceso completo del proyecto se documentará en `proyecto.md`, incluyendo configuraciones, comandos, resultados y capturas de las pruebas realizadas.

El reparto de tareas y la reflexión individual y grupal se recogerán en `gestion.md`.
