#!/bin/bash

# Definir valores padrão para o domínio e a porta
VAR_1="example.com"
VAR_2="90"
VAR_2="3000"

# Solicitar ao usuário para substituir os valores padrão, se desejado
read -p "Entre com o domínio [$VAR_1]: " input_var_1
read -p "Entre com a porta do frontend [$VAR_2]: " input_var_2
read -p "Entre com a porta do backend [$VAR_3]: " input_var_3

# Substituir os valores padrão com os valores fornecidos pelo usuário, se existirem
VAR_1="${input_var_1:-$VAR_1}"
VAR_2="${input_var_2:-$VAR_2}"
VAR_3="${input_var_3:-$VAR_3}"



# Atualizar sistema
cd ~
sudo yum update -y

# Instalar o Nginx
sudo yum install -y nginx

# Iniciar o Nginx e configurar para iniciar no boot
sudo service nginx start
sudo chkconfig nginx on
sudo service nginx stop

echo "
server {
    listen 80;
    server_name $VAR_1;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $VAR_1;

    ssl_certificate /root/.acme.sh/$VAR_1/fullchain.cer;
    ssl_certificate_key /root/.acme.sh/$VAR_1/$VAR_1.key;

    location / {
        proxy_pass http://localhost:$VAR_2;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
    location /api {
        proxy_pass http://localhost:$VAR_3;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
"

# Executar os comandos como root

# Instalar pacotes de agendamento
# yum install cronie socat

# Instalar o acme.sh
# curl https://get.acme.sh | sh

# Criar link simbólico para o acme.sh
# ln -s /root/.acme.sh/acme.sh /usr/local/bin/acme.sh

# Configurar o acme com o meu email
# acme.sh --register-account -m caio.domingos@thinkless.com.br

# Emitir o certificado SSL
# acme.sh --issue --standalone -d $VAR_1

# Editar o arquivo de configuração do Nginx
# sudo vi /etc/nginx/conf.d/myapp.conf

# Adicionar as configurações do servidor

# server {
#     listen 80;
#     server_name $VAR_1;
#     return 301 https://\$host\$request_uri;
# }

# server {
#     listen 443 ssl;
#     server_name $VAR_1;

#     ssl_certificate /root/.acme.sh/$VAR_1_ecc/fullchain.cer;
#     ssl_certificate_key /root/.acme.sh/$VAR_1_ecc/$VAR_1.key;

#     location / {
#         proxy_pass http://localhost:$VAR_2;
#         proxy_set_header Host \$host;
#         proxy_set_header X-Real-IP \$remote_addr;
#         proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
#     }
#     location /api {
#         proxy_pass http://localhost:$VAR_3;
#         proxy_set_header Host \$host;
#         proxy_set_header X-Real-IP \$remote_addr;
#         proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
#     }
# }


# Reiniciar o Nginx
# e
