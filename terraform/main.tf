
# LECTURA AUTOMATICA DE CLAVES PUBLICAS

locals {
  ssh_public_keys = [
    for key_file in fileset("${path.module}/keys", "*.pub") :
    trimspace(file("${path.module}/keys/${key_file}"))
  ]
}

# MANAGER DEL CLUSTER

resource "aws_instance" "manager" {

  ami           = var.ami_id
  instance_type = var.instance_type_manager

  # Clave de reserva de AWS Learner Lab
  key_name = "vockey"

  # Script de inicializacion del manager
  user_data = templatefile("${path.module}/user_data.sh", {
    hostname        = "manager-g${var.numero_grupo}"
    ssh_public_keys = join("\n", local.ssh_public_keys)
  })

  # Asignar IP publica
  associate_public_ip_address = true

  # Security Group del cluster
  vpc_security_group_ids = [
    aws_security_group.cluster.id
  ]

  # Disco principal
  root_block_device {
    volume_size           = var.manager_disk_size
    volume_type           = "gp3"
    delete_on_termination = true
  }

  # Etiquetas
  tags = {
    Name    = "manager-g${var.numero_grupo}"
    Role    = "manager"
    Group   = var.numero_grupo
    Project = "CLOUD-Reto4"
  }
}

# WORKERS DEL CLUSTER

resource "aws_instance" "workers" {

  # Crear tres workers sin duplicar recursos
  count = 3

  ami           = var.ami_id
  instance_type = var.instance_type_worker

  # Clave de reserva de AWS Learner Lab
  key_name = "vockey"

  # Script de inicializacion de cada worker
  user_data = templatefile("${path.module}/user_data.sh", {
    hostname        = "worker${count.index + 1}-g${var.numero_grupo}"
    ssh_public_keys = join("\n", local.ssh_public_keys)
  })

  # Asignar IP publica
  associate_public_ip_address = true

  # Security Group del cluster
  vpc_security_group_ids = [
    aws_security_group.cluster.id
  ]

  # Disco principal
  root_block_device {
    volume_size           = var.worker_disk_size
    volume_type           = "gp3"
    delete_on_termination = true
  }

  # Etiquetas
  tags = {
    Name    = "worker${count.index + 1}-g${var.numero_grupo}"
    Role    = "worker"
    Group   = var.numero_grupo
    Project = "CLOUD-Reto4"
  }
}

