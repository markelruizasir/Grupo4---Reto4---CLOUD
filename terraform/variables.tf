
# IDENTIFICACION DEL PROYECTO
variable "numero_grupo" {
  description = "Numero del grupo de trabajo"
  type        = string

  validation {
    condition     = can(regex("^[0-9]+$", var.numero_grupo))
    error_message = "El numero de grupo debe contener solamente numeros."
  }
}

# IMAGEN DEL SISTEMA OPERATIVO

variable "ami_id" {
  description = "ID de la AMI Ubuntu Server 22.04 en us-east-1"
  type        = string
}


# TIPOS DE INSTANCIA

variable "instance_type_manager" {
  description = "Tipo de instancia EC2 del manager"
  type        = string
  default     = "t3.medium"
}

variable "instance_type_worker" {
  description = "Tipo de instancia EC2 de los workers"
  type        = string
  default     = "t3.small"
}


# ALMACENAMIENTO

variable "manager_disk_size" {
  description = "Tamano del disco del manager en GB"
  type        = number
  default     = 20
}

variable "worker_disk_size" {
  description = "Tamano del disco de cada worker en GB"
  type        = number
  default     = 10
}


# SEGURIDAD SSH

variable "ssh_allowed_cidr" {
  description = "Rango CIDR autorizado para acceder por SSH"
  type        = string

  validation {
    condition     = can(cidrhost(var.ssh_allowed_cidr, 0)) && var.ssh_allowed_cidr != "0.0.0.0/0"
    error_message = "Introduce un rango CIDR valido. No se permite abrir SSH a todo Internet."
  }
}
