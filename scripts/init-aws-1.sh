# Atualizar pacotes
echo "Atualizando pacotes"
sudo yum update -y

# Instalar o Git
echo "Instalando o Git"
sudo yum install git -y

# Instalar o Docker
echo "Instalando o Docker"
sudo yum install docker -y

# Habilatar o Docker e inicializa-lo
echo "Iniciando o Docker"
sudo systemctl start docker
sudo systemctl enable docker

# Configurando as permissões
echo "Configurando as permissões"
sudo usermod -a -G docker ec2-user


