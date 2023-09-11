#!/bin/bash

# Configuração
# FRONTEND_REPO="https://github.com/Caio-Domingos/tay-training-frontend.git"
# BACKEND_REPO="https://github.com/Caio-Domingos/tay-training-backend.git"
# FRONTEND_DIR="tay-training-frontend"
# BACKEND_DIR="tay-training-backend"

# # Atualizar os repositórios
# echo "Atualizando o repositório frontend..."
# cd $FRONTEND_DIR
# git pull $FRONTEND_REPO
# npm i
# cd ..

# echo "Atualizando o repositório backend..."
# cd $BACKEND_DIR
# git pull $BACKEND_REPO
# npm i
# cd ..

# Limpar containers e imagens antigas
echo "Removendo containers e imagens antigas..."
docker-compose down
docker system prune -af

# Criar e executar novos containers
echo "Criando e executando novos containers..."
docker-compose up -d
