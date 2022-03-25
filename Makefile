.PHONY: up
up:
	docker-compose up

.PHONY: up-prod
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

.PHONY: build
build:
	docker-compose up --build --remove-orphans

.PHONY: build-prod
build-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --remove-orphans

.PHONY: down
down:
	docker-compose down
