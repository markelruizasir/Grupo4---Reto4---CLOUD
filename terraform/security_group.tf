
# VPC POR DEFECTO DE AWS

data "aws_vpc" "default" {
  default = true
}

# SECURITY GROUP DEL CLUSTER

resource "aws_security_group" "cluster" {
  name        = "cluster-g${var.numero_grupo}"
  description = "Security Group para Docker Swarm grupo ${var.numero_grupo}"
  vpc_id      = data.aws_vpc.default.id

  tags = {
    Name    = "cluster-g${var.numero_grupo}"
    Project = "CLOUD-Reto4"
    Group   = var.numero_grupo
  }
}

# ENTRADA SSH DESDE CODESPACES

resource "aws_vpc_security_group_ingress_rule" "ssh_codespaces" {
  security_group_id = aws_security_group.cluster.id

  cidr_ipv4   = var.ssh_allowed_cidr
  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"

  description = "SSH desde Codespaces"
}

# SSH ENTRE NODOS DEL CLUSTER

resource "aws_vpc_security_group_ingress_rule" "ssh_cluster" {
  security_group_id = aws_security_group.cluster.id

  referenced_security_group_id = aws_security_group.cluster.id
  from_port                    = 22
  to_port                      = 22
  ip_protocol                  = "tcp"

  description = "SSH entre nodos del cluster"
}

# ACCESO WEB HTTP

resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.cluster.id

  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 80
  to_port     = 80
  ip_protocol = "tcp"

  description = "Acceso web HTTP"
}

resource "aws_vpc_security_group_ingress_rule" "http_8080" {
  security_group_id = aws_security_group.cluster.id

  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 8080
  to_port     = 8080
  ip_protocol = "tcp"

  description = "Acceso web puerto 8080"
}

# DOCKER SWARM - PUERTO 2377 TCP

resource "aws_vpc_security_group_ingress_rule" "swarm_control" {
  security_group_id = aws_security_group.cluster.id

  referenced_security_group_id = aws_security_group.cluster.id
  from_port                    = 2377
  to_port                      = 2377
  ip_protocol                  = "tcp"

  description = "Docker Swarm control plane"
}

# DOCKER SWARM - PUERTO 7946 TCP

resource "aws_vpc_security_group_ingress_rule" "swarm_discovery_tcp" {
  security_group_id = aws_security_group.cluster.id

  referenced_security_group_id = aws_security_group.cluster.id
  from_port                    = 7946
  to_port                      = 7946
  ip_protocol                  = "tcp"

  description = "Swarm node discovery TCP"
}

# DOCKER SWARM - PUERTO 7946 UDP

resource "aws_vpc_security_group_ingress_rule" "swarm_discovery_udp" {
  security_group_id = aws_security_group.cluster.id

  referenced_security_group_id = aws_security_group.cluster.id
  from_port                    = 7946
  to_port                      = 7946
  ip_protocol                  = "udp"

  description = "Swarm node discovery UDP"
}

# DOCKER SWARM - PUERTO 4789 UDP

resource "aws_vpc_security_group_ingress_rule" "swarm_overlay" {
  security_group_id = aws_security_group.cluster.id

  referenced_security_group_id = aws_security_group.cluster.id
  from_port                    = 4789
  to_port                      = 4789
  ip_protocol                  = "udp"

  description = "Docker Swarm overlay VXLAN"
}

# ICMP ENTRE NODOS

resource "aws_vpc_security_group_ingress_rule" "icmp_cluster" {
  security_group_id = aws_security_group.cluster.id

  referenced_security_group_id = aws_security_group.cluster.id
  from_port                    = -1
  to_port                      = -1
  ip_protocol                  = "icmp"

  description = "ICMP entre nodos del cluster"
}

# SALIDA IPv4

resource "aws_vpc_security_group_egress_rule" "egress_ipv4" {
  security_group_id = aws_security_group.cluster.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"

  description = "Salida IPv4 para actualizaciones y servicios externos"
}

