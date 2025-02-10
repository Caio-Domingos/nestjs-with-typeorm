#!/bin/bash

# Atualizar sistema
cd ~
sudo yum update -y

# Instalar o Nginx
sudo yum install -y nginx

# Iniciar o Nginx e configurar para iniciar no boot
sudo service nginx start
sudo chkconfig nginx on
sudo service nginx stop

# Criar configuração do Nginx com valores fixos
sudo tee /etc/nginx/conf.d/myapp.conf > /dev/null <<EOL
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOL

# Reiniciar o Nginx para aplicar as configurações
sudo service nginx restart

#!/bin/bash

# Atualizar o sistema
cd ~
sudo yum update -y

# Instalar o PM2 globalmente com npm
npm install -g pm2

pm2 startup systemd