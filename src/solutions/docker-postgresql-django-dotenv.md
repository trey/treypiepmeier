---
title: Use PostgreSQL and Django with Docker and Keep Credentials in an .env File
date: 2020-07-31
tags: [docker, postgresql, django]
---

Use this as a starting point: [Chapter 2: PostgreSQL | Django For Professionals](https://djangoforprofessionals.com/postgresql/).

Now define things in an `.env` file:

<!-- Using `javascript` as a syntax for the sake of having pretty highlighting.
I’m not sure what I should use for a .env file.
I think these are the options available for the way things are set up on this
blog: https://highlightjs.org/static/demo/ -->
```javascript
POSTGRES_DB=trey_app
POSTGRES_USER=trey_app
POSTGRES_PASSWORD=awesomepassword
```

The defaults are `postgres` for all of those, but that’s no fun. Maybe this is more secure? Maybe not. Here’s [the documentation for the official Docker image for PostgreSQL](https://hub.docker.com/_/postgres/). Maybe I can make more sense of that later. I’m just tickled this works now.

Put this block within both the `web` and the `db` sections of `docker-compose.yml`:

```yaml
environment:
    - POSTGRES_DB=${POSTGRES_DB}
    - POSTGRES_USER=${POSTGRES_USER}
    - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
```

This uses [Docker’s default environment stuff](https://docs.docker.com/compose/environment-variables/#the-env-file).

For `db` (if I understand correctly), this actually creates that user and database and sets the password. For `web`, it makes those things available to use in `settings.py` via the (Docker host’s?) os environment variables. Speaking of which:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'db',
        'PORT': 5432
    }
}
```
