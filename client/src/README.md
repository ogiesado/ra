# How To Run

## Requirements

- Docker Compose
- Ports `8081` and `8082` should be free on your computer (The UI will be availabel at http://localhost:8082/)

## Steps

- Open a terminal and `cd` to the location you want to clone the repo
- Run git `clone git@github.com:ogiesado/ra.git`
- `cd` into the folder by running `cd ra`
- Run `docker-compose build`
- Run `docker-compose --env-file .env up`

After the above steps the aplication should be available at `http://localhost:8082/`
