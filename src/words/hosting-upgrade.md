---
title: Hosting Upgrade
date: 2020-09-12
tags: [cassettenest, gratitude, technical]
---

Cassette Nest development has been on hiatus recently, but it’s ramping back up. Thank you to [Jonnie Hallman](https://destroytoday.com/blog/a-reminder-to-write) for inspiring me to start writing about my process again!

The big task on my plate right now is updating my hosting infrastructure. I’m going from a basic setup on [PythonAnywhere](https://www.pythonanywhere.com) using SQLite to all the new fanciness I can stand with Docker and PostgreSQL running on [DigitalOcean](https://m.do.co/c/5ddc4153469e).

As I see it now, using Docker is the best way to build websites if you need what you're working on locally to match how it works on a real web server. The alternatives are using a huge virtual machine or contorting your personal computer beyond all recognition.

That meant I had to learn how to host Docker-powered sites. I've been away from traditional hosting companies for a while now, opting for things like [Netlify](https://www.netlify.com). Static site hosts are wonderful, but they don't let you host arbitrary things like [lists of files](https://bucket.treypiepmeier.com) or [Django apps](https://app.cassettenest.com). For Docker-powered sites, your choices are using a [platform-as-a-service](https://en.wikipedia.org/wiki/Platform_as_a_service) like [Heroku](https://www.heroku.com) where you have to pay per site (if you want SSL--and how could you not?!) or an [infrastructure-as-a-service](https://en.wikipedia.org/wiki/Infrastructure_as_a_service) like DigitalOcean where you can roll your own just-about-anything for a set monthly price. I didn’t _want_ to go the roll your own route, but I also didn't want to pay $7/month for every little idea I want to try. Plus, I really liked the idea of using DigitalOcean for a number of reasons:

- It's a very well designed and easy to use service.
- It comes highly recommended from my peers.
- It’s not [owned by Salesforce](https://en.wikipedia.org/wiki/Heroku#History).
- It doesn’t use [Amazon](https://www.youtube.com/watch?v=II_0DbuxEEg "Anand Giridharadas on Jeff Bezos") infrastructure behind the scenes[^amazon]!

[^amazon]: This is a big one. I can't understand why more folks aren't talking about avoiding technology that is helping to destroy the world. Most of the internet runs on Amazon's servers. Front-end developers seem to only talk about (Facebook-created) React. This is not ok. I'm trying really hard to avoid all that mess but I feel like the rest of the world is ~~gaslighting me~~ not paying attention.

It's possible to [host as many Docker-powered sites as you want](https://www.digitalocean.com/community/tutorials/how-to-use-traefik-as-a-reverse-proxy-for-docker-containers-on-ubuntu-18-04) on the same [Droplet](https://marketplace.digitalocean.com/apps/docker) (until you run out of your allocated resources). Although it's fiddly to get going, once a site is set up, it’s pretty hands off. Do a `git push`, wait a few moments, and see your changes!

Figuring out how to host Docker sites was, and continues to be, a very good learning experience. I can’t imagine going back to developing anything beyond a static site without using Docker. It’s really good. Docker (or [container technology](https://www.youtube.com/watch?v=0qotVMX-J5s "Containerization Explained") at least) is The Way.
