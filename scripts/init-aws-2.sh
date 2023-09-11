#Checando a instalação do Docker
docker info

# Instalando o Docker Compose
echo "Instalando o Docker Compose"
sudo curl -L "https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-$(uname -m)" -o docker-compose
file docker-compose
sudo mv docker-compose /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

# Instalando o Node
echo "Instalando o Node"
sudo yum update -y
sudo yum install -y gcc-c++ make
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm --version
nvm install --lts
node --version