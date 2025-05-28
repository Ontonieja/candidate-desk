if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Please install Docker Desktop: https://www.docker.com/products/docker-desktop/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose is not installed. Please install Docker Desktop (includes docker-compose)."
    exit 1
fi

if [ ! -f server/.env ]; then
    if [ -f server/.env.example ]; then
        cp server/.env.example server/.env
        echo "Created server/.env from server/.env.example. Please edit it and add your API keys."
        exit 1
    else
        echo "No server/.env or server/.env.example found. Please create server/.env manually."
        exit 1
    fi
fi


docker-compose up --build