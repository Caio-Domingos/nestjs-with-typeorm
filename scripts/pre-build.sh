#!/bin/bash

# Configuração
DOCKERHUB_USER="thinklesshouse"
PROJECT="nestjs-gs"
# FRONTEND_DIR="tay-training-frontend"
BACKEND_DIR="../"
# DB_DIR="tay-training-database"

# Função de animação
spinner() {
  local pid=$!
  local delay=0.1
  local spinstr='|/-\'
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    local temp=${spinstr#?}
    printf " [%c]  " "$spinstr"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}

# Função para verificar o sucesso da ação
check_success() {
  local exit_code=$1
  local duration=$2
  if [ $exit_code -eq 0 ]; then
    printf " [OK] (%02d s)\n" $duration
  else
    printf " [ERRO] (%02d s)\n" $duration
    exit 1
  fi
}

# Perguntar sobre o ambiente de desenvolvimento
read -p "Qual ambiente de desenvolvimento? (production): " BUILD_ENV
BUILD_ENV=${BUILD_ENV:-production}


echo -n "Atualizando o repositório backend..."
start_time=$(date +%s)
(cd $BACKEND_DIR && npm run build:$BUILD_ENV  >/dev/null 2>&1) & spinner
end_time=$(date +%s)
duration=$((end_time - start_time))
check_success $? $duration

# Configurar o ambiente BuildKit
echo "Configurando o ambiente BuildKit..."
docker buildx create --use --name mybuilder

# Configurar as plataformas desejadas
echo "Configurando as plataformas para build..."
docker buildx inspect --bootstrap
docker buildx install

# # Criar uma imagem nova do Frontend para linux/amd64 e enviar para o DockerHub
# echo -n "Criando a imagem do frontend (linux/amd64)..."
# start_time=$(date +%s)
# (cd $FRONTEND_DIR && docker buildx build --push --platform linux/amd64 -t $DOCKERHUB_USER/tay-frontend:amd .)
# # docker push $DOCKERHUB_USER/tay-frontend:amd 
# end_time=$(date +%s)
# duration=$((end_time - start_time))
# check_success $? $duration

# # Criar uma imagem nova do Frontend para linux/arm64/v8 e enviar para o DockerHub
# echo -n "Criando a imagem do frontend (linux/arm64/v8)..."
# start_time=$(date +%s)
# (cd $FRONTEND_DIR && docker buildx build --push -t $DOCKERHUB_USER/tay-frontend:arm .)
# # docker push $DOCKERHUB_USER/tay-frontend:arm 
# end_time=$(date +%s)
# duration=$((end_time - start_time))
# check_success $? $duration

# Criar uma imagem nova do Backend para linux/amd64 e enviar para o DockerHub
echo -n "Criando a imagem do backend (linux/amd64)..."
start_time=$(date +%s)
(cd $BACKEND_DIR && docker buildx build --push --platform linux/amd64 -t $DOCKERHUB_USER/$PROJECT:amd .)
end_time=$(date +%s)
duration=$((end_time - start_time))
check_success $? $duration

# Criar uma imagem nova do Backend para linux/arm64/v8 e enviar para o DockerHub
echo -n "Criando a imagem do backend (linux/arm64/v8)..."
start_time=$(date +%s)
(cd $BACKEND_DIR && docker buildx build --push -t $DOCKERHUB_USER/$PROJECT:arm .)
end_time=$(date +%s)
duration=$((end_time - start_time))
check_success $? $duration

# # Criar uma imagem nova do Banco de Dados para linux/amd64 e enviar para o DockerHub
# echo -n "Criando a imagem do banco de dados (linux/amd64)..."
# start_time=$(date +%s)
# (cd $DB_DIR && docker buildx build --push --platform linux/amd64 -t $DOCKERHUB_USER/tay-db:amd .)
# # docker push $DOCKERHUB_USER/tay-db:amd 
# end_time=$(date +%s)
# duration=$((end_time - start_time))
# check_success $? $duration

# # Criar uma imagem nova do Banco de Dados para linux/arm64/v8 e enviar para o DockerHub
# echo -n "Criando a imagem do banco de dados (linux/arm64/v8)..."
# start_time=$(date +%s)
# (cd $DB_DIR && docker buildx build --push -t $DOCKERHUB_USER/tay-db:arm .)
# # docker push $DOCKERHUB_USER/tay-db:arm 
# end_time=$(date +%s)
# duration=$((end_time - start_time))
# check_success $? $duration
