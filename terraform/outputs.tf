
# INFORMACION DEL MANAGER

output "manager" {
  description = "Informacion del nodo manager"

  value = {
    instance_id = aws_instance.manager.id
    public_ip   = aws_instance.manager.public_ip
    private_ip  = aws_instance.manager.private_ip
  }
}

# INFORMACION DE LOS WORKERS

output "workers" {
  description = "Informacion de los tres nodos workers"

  value = {
    for index, instance in aws_instance.workers :

    "worker${index + 1}-g${var.numero_grupo}" => {
      instance_id = instance.id
      public_ip   = instance.public_ip
      private_ip  = instance.private_ip
    }
  }
}
