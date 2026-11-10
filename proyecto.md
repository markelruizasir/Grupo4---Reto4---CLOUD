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

[Insertar aquí la captura de la terminal de Codespaces].

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