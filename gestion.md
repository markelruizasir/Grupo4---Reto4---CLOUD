# Gestión del proyecto — CLOUD Reto 4

**Proyecto:** Web en clúster Docker Swarm sobre AWS  
**Ciclo:** 2.º ASIR · **Asignatura:** CLOUD · **Grupo:** 4

---

## 1. Organización del equipo

El trabajo se organizó por bloques técnicos para poder desarrollar y comprobar cada parte del proyecto de forma ordenada. GitHub se utilizó como repositorio central y GitHub Codespaces como entorno principal de administración de AWS, Terraform, SSH y Docker.

La organización se basó en estas responsabilidades:

| Bloque | Responsabilidades | Resultado asociado |
|---|---|---|
| Coordinación y repositorio | Crear y mantener el repositorio, organizar las carpetas, preparar Codespaces y mantener la documentación. | Repositorio privado, entorno de trabajo y memoria técnica. |
| Infraestructura cloud | Definir las variables y recursos Terraform, configurar EC2, Security Group, User Data y outputs. | Cuatro instancias EC2: un manager y tres workers. |
| Administración remota | Generar y distribuir la clave pública, configurar alias SSH, ProxyJump y endurecer el acceso. | Administración de los cuatro nodos mediante SSH. |
| Contenedores y orquestación | Preparar el Dockerfile y la imagen, publicar versiones en Docker Hub, crear las redes y desplegar el servicio Swarm. | Servicio `grupo4-f1` con cuatro réplicas. |
| Aplicación web | Preparar la aplicación web original facilitada para el proyecto y coordinar su integración en la imagen Docker. | Archivos de la web incluidos en `app/grupo4-f1/`. |
| Pruebas y documentación | Ejecutar las pruebas de orquestación, guardar las evidencias y explicar los resultados. | Pruebas E1–E8 y documentación de las fases. |

La distribución concreta de responsables debe reflejar los integrantes reales del grupo. Para evitar atribuir tareas a una persona equivocada, se deja el siguiente registro para completar con los nombres del equipo antes de entregar:

| Integrante | Bloque principal | Apoyo realizado |
|---|---|---|
| [Markel Ruiz] | [Realizador]
| [Oier Garcia] | [No ha participado en el proyecto al completo]
| [Martin Avis] | [No ha participado en el proyecto al completo]
| [Asier Trabanco] | [No ha participado en el proyecto al completo]
  [Unai Villanueva] | [No ha participado en el proyecto al completo]

## 2. Herramientas de coordinación y control de versiones

### 2.1. GitHub

Se creó un repositorio privado para centralizar el código fuente, los archivos Terraform, la configuración SSH de ejemplo, los scripts, los diagramas, las capturas y los documentos de entrega.

Se invitó a los integrantes del grupo y al profesor. También se habilitó el uso de Pull Requests para que los cambios de los colaboradores pudieran revisarse antes de integrarse en la rama principal.

El flujo de trabajo definido fue:

1. Clonar el repositorio o abrirlo desde Codespaces.
2. Crear una rama para el cambio que se vaya a realizar.
3. Modificar los archivos correspondientes.
4. Revisar los cambios con `git status` y `git diff`.
5. Registrar los cambios mediante `git add` y `git commit`.
6. Publicar la rama mediante `git push`.
7. Abrir un Pull Request, revisar las modificaciones e integrarlas en `main`.

Los commits permiten identificar qué archivos se modificaron y mantener un historial de evolución del proyecto. Los Pull Requests facilitan la revisión de los cambios antes de incorporarlos a la versión principal.

> **Evidencia de colaboración:** completar esta sección con una captura del historial de commits y, si existen, de los Pull Requests reales. La configuración de permisos para Pull Requests por sí sola no demuestra que se hayan creado y fusionado Pull Requests.

### 2.2. GitHub Codespaces

Codespaces se utilizó como estación de trabajo para administrar la infraestructura. El entorno se configuró mediante `.devcontainer/devcontainer.json` e incorporó AWS CLI y Terraform.

La configuración permite que el entorno de trabajo se pueda reconstruir desde el repositorio sin instalar manualmente todas las herramientas en cada equipo.

### 2.3. Organización de los archivos

El repositorio separa los distintos componentes del proyecto:

- `terraform/`: definición de la infraestructura AWS.
- `app/`: Dockerfile, configuración de Nginx, script de identificación y archivos de la aplicación.
- `config/`: ejemplo de configuración de SSH.
- `scripts/`: utilidades de comprobación y monitorización.
- `diagramas/`: representación de la arquitectura.
- `capturas/`: evidencias de las fases y pruebas.
- `practica-individual/`: documentación individual.
- `proyecto.md`: memoria técnica del desarrollo.
- `README.md`: resumen e instrucciones generales.
- `gestion.md`: organización del trabajo y reflexión del equipo.

## 3. Desarrollo del proyecto por bloques

### 3.1. Entorno y repositorio

Se preparó el repositorio privado, se configuró Codespaces y se organizaron las carpetas. Esta base permitió mantener juntos el código, las configuraciones y las evidencias del trabajo.

### 3.2. Infraestructura AWS con Terraform

Se definieron los recursos necesarios para crear cuatro instancias EC2 en la región `us-east-1`: `manager-g4`, `worker1-g4`, `worker2-g4` y `worker3-g4`.

Terraform permitió parametrizar el despliegue, reutilizar una única definición de recurso para los tres workers y configurar el Security Group compartido. El script `user_data.sh` se utilizó para preparar los servidores, configurar los hostnames, establecer la zona horaria, incorporar claves públicas e instalar Docker.

### 3.3. Acceso remoto SSH

Se configuró una clave SSH propia y se instaló la clave pública en los servidores. Los alias del cliente permiten acceder mediante nombres cortos. Para llegar a los workers se utilizó el manager como salto SSH, evitando depender de una conexión administrativa directa a cada worker.

También se revisó la configuración del servicio SSH para restringir el acceso por contraseña y el acceso directo como `root`.

### 3.4. Docker Swarm y redes

Se comprobó Docker en los cuatro nodos y la conectividad mediante sus direcciones privadas. Swarm se inicializó en el manager utilizando su IP privada y se incorporaron los tres workers.

Se configuró una red `ingress` personalizada con MTU 1450 y una red overlay propia para la aplicación, denominada `red-app-g4`.

### 3.5. Aplicación web e imagen Docker

La aplicación web original se integró en una imagen basada en `nginx:alpine`. Se publicaron las etiquetas `1.0` y `2.0` en Docker Hub para las pruebas de actualización y rollback. Posteriormente se publicó la etiqueta `2.1`, que incorporó el panel de información de infraestructura y la identificación del contenedor que responde.

El servicio `grupo4-f1` se desplegó en modo replicado, con cuatro réplicas, puerto TCP 80, red overlay y políticas de reinicio. La configuración final verificada mantiene un máximo de una réplica por nodo.

### 3.6. Pruebas de orquestación

Se realizaron pruebas para comprobar el comportamiento del clúster ante cambios de escala, fallos de contenedores, caída de un worker, reincorporación de nodos, mantenimiento, actualización y elección de un nuevo manager líder.

Las pruebas se documentan individualmente en `proyecto.md` y sus capturas se organizan dentro de `capturas/`.

## 4. Decisiones técnicas y problemas resueltos

Durante el proyecto aparecieron situaciones que requirieron revisar la configuración y comprender el comportamiento de los servicios utilizados.

### 4.1. Direcciones IP públicas dinámicas

Las direcciones públicas asignadas por AWS pueden cambiar cuando una instancia EC2 se detiene y vuelve a iniciarse. Por ello, las IP públicas no se deben tratar como valores permanentes ni dejar copiadas como si fueran estables en la documentación.

Para consultar las direcciones vigentes se utiliza AWS CLI. Las comunicaciones internas del clúster y la inicialización de Swarm se apoyan en las IP privadas de las instancias.

### 4.2. Diferencia entre acceso por IP y alta disponibilidad

Se distinguieron dos comprobaciones diferentes:

- Acceso individual: verificar que la aplicación responde al entrar por la IP pública de cada uno de los cuatro nodos.
- Alta disponibilidad y balanceo: mantener una misma IP pública de entrada durante la prueba y comprobar que Swarm dirige las peticiones a diferentes réplicas o sigue respondiendo cuando un worker deja de estar disponible.

Esta distinción permitió adaptar las pruebas a la aclaración del profesor sobre el objetivo real de un clúster.

### 4.3. Reequilibrio tras recuperar un nodo

Al volver a iniciar `worker3-g4`, el nodo se reincorporó al clúster como `Ready` y `Active`. Sin embargo, la recuperación del nodo no implica que Swarm devuelva automáticamente todas las tareas a su distribución anterior.

Para recuperar una réplica por nodo se forzó una actualización del servicio y se configuró el límite `--replicas-max-per-node 1`. La comprobación final mostró cuatro tareas `Running`, una por cada nodo.

### 4.4. Seguridad y archivos locales

Se incorporaron reglas en `.gitignore` para excluir archivos de estado y variables locales de Terraform, credenciales, claves privadas y archivos de entorno. La clave privada SSH y las credenciales de AWS deben permanecer fuera del repositorio.

## 5. Estado final del despliegue

Al finalizar las pruebas y restaurar la configuración normal, el clúster quedó con un manager y tres workers:

| Nodo | Función | Estado final verificado |
|---|---|---|
| `manager-g4` | Manager líder | Ready / Active |
| `worker1-g4` | Worker | Ready / Active |
| `worker2-g4` | Worker | Ready / Active |
| `worker3-g4` | Worker | Ready / Active |

El servicio `grupo4-f1` quedó desplegado con cuatro réplicas de la imagen `markelasir/grupo4-f1:2.1`, conectadas a `red-app-g4` y publicadas por TCP 80 mediante el modo `ingress`.

La distribución final comprobada fue una réplica por nodo.

## 6. Reflexión del equipo

El desarrollo del proyecto permitió integrar herramientas que normalmente se estudian por separado y utilizarlas conjuntamente en un despliegue real sobre AWS.

Uno de los aprendizajes principales fue comprender la diferencia entre aprovisionar infraestructura y administrar los servicios que se ejecutan sobre ella. Terraform define y crea los recursos de AWS, SSH proporciona el acceso administrativo, Docker construye y ejecuta los contenedores y Docker Swarm mantiene el estado deseado del servicio.

También se comprobó que tener cuatro IP públicas que permiten abrir la web no demuestra por sí solo la alta disponibilidad. Para demostrar el comportamiento de un clúster es necesario observar qué réplica atiende las peticiones que entran por una misma dirección y verificar que el servicio continúa respondiendo cuando uno de los nodos falla.

Las pruebas de fallo y recuperación ayudaron a entender que el estado de un nodo, el estado de una tarea y el estado del servicio son conceptos diferentes. Un worker puede volver a estar disponible sin que las tareas regresen automáticamente a su distribución anterior. Por eso se verificó el estado final con `docker node ls`, `docker service ls` y `docker service ps`.

Otro aprendizaje importante fue la gestión de las direcciones IP públicas dinámicas de AWS. La documentación y las configuraciones deben consultar los valores vigentes, en lugar de asumir que una dirección pública permanecerá igual después de reiniciar una instancia.

En materia de seguridad, se reforzó la importancia de utilizar claves SSH propias, limitar el acceso administrativo y excluir del repositorio los archivos que contienen credenciales, claves privadas y estado local de Terraform.

Como mejora futura, se podría incorporar un punto de entrada estable mediante un servicio de balanceo administrado o direcciones IP elásticas, siempre que el entorno y sus permisos lo permitan. También sería conveniente automatizar la actualización de la información de acceso cuando cambien las IP públicas.

## 7. Aspectos pendientes de completar antes de la entrega

- Sustituir los cuatro campos `[Nombre del integrante ...]` por los nombres reales y asignar a cada persona sus tareas efectivas.
- Añadir una captura del historial de commits y de los Pull Requests reales, si se utilizaron.
- Comprobar que la invitación del profesor y de todos los colaboradores aparece aceptada en GitHub.
- Revisar que todas las capturas referenciadas en `proyecto.md` están presentes en el repositorio.
- Confirmar que no se han versionado claves privadas, credenciales, `terraform.tfstate` ni archivos `terraform.tfvars`.

