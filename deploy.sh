#!/usr/bin/env bash

# don't forget to make this file executable by running $ chmod +x deploy.sh

ssh deploy@polynets.ca << EOF

# git pull latest version from origin/master
cd /home/deploy/vacation-fund
eval "$(ssh-agent -s)" || true
ssh-add ~/.ssh/id_rsa || true
git pull || true

# backend
cd /home/deploy/vacation-fund/backend
docker-compose down || true
docker-compose rm -f || true
docker-compose pull || true
docker-compose up --build -d
docker-compose run django python manage.py migrate
EOF
