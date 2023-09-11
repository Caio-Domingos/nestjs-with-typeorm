if [ $(docker ps -a -f name=nestjs-gs -q) ]; then
    docker restart nestjs-gs
else
    docker run -d --name nestjs-gs -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mydb -p 3305:5432 -v nestjs-gs-db-data:/var/lib/postgresql/data --restart always postgres-default
fi
