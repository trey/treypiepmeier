---
title: Run WordPress Locally with Docker
date: 2019-07-18
tags: [wordpress, docker]
---
_I'd like to start by thanking [Josh](https://twitter.com/joshmock) for convincing me to go this route instead of [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) (which is particularly relevant since [I'm using a pretty pedestrian laptop nowadays](https://treylabs.com/2019/07/17/apps-on-rosie/) and Docker containers should be nicer to my RAM than virtual machines)._

1. Download and install [Docker](https://hub.docker.com/editions/community/docker-ce-desktop-mac).
2. Create a folder where all the WordPress files will live and `cd` into it.
3. Create a `docker-compose.yml` file (shown below) in the folder.
4. Run `docker-compose up -d`.
5. Visit [http://localhost:8000](http://localhost:8000) and finish the installation process.

Now you can create and modify themes and plugins in their proper places within the folder you created.

Here's how you work with your fancy Docker setup from now on:

- To stop the containers, run `docker-compose stop`.
- To start everything back up, run `docker-compose start` or `docker-compose up -d`.
- To stop the containers and delete everything, run `docker-compose down --volumes`
- To use phpMyAdmin, visit [http://localhost:8080](http://localhost:8080).

Sources:

- [How to Install WordPress on Docker (Windows, MacOS and Linux)](https://www.hostinger.com/tutorials/run-docker-wordpress)
- [Quick Wordpress Setup With Docker - YouTube](https://www.youtube.com/watch?v=pYhLEV-sRpY)
- [Docker Compose FIle For Wordpress, MySQL & phpmyadmin · GitHub](https://gist.github.com/bradtraversy/faa8de544c62eef3f31de406982f1d42)

---

Save this file as `docker-compose.yml` in the folder you created:

```yaml
version: '2'

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  phpmyadmin:
    depends_on:
      - db
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - '8080:80'
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORD: somewordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    volumes: ['./:/var/www/html']
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress

volumes:
  db_data:
```
