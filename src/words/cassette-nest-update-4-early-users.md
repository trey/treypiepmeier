---
title: 'Cassette Nest: Early Users are Amazing'
date: 2019-07-15
tags: cassettenest
---

I’m very thankful for my early users. I have a couple of friends who are helping me by using Cassette Nest and sharing their experiences and suggestions. They have driven lots of important things in the development of the app.

As the person thinking up and building the interfaces, I know all the intentions and [happy paths](https://en.wikipedia.org/wiki/Happy_path). These folks are helping me find what actually makes sense.

A big issue I worked through recently was creating the ability to add a roll of film directly to a status other than “storage.”

The main use case I had in my head as I built the app was that someone would follow this strict process:

1. Add all their unused film into the system.
2. Load a camera with a roll of film and track its process as it’s shot, processed, and eventually archived.
3. Have a beautiful Logbook of everything they’ve done.

But as someone first uses the app, they will almost certainly have film that’s already been shot. Adding archived rolls into the system was eventually going to be a big use case for me too, but my early users found the issue long before I did.

As I was perusing the [admin interface](https://docs.djangoproject.com/en/2.2/ref/contrib/admin/) one day, I noticed the status of some rolls of film had changed from “storage” to “shot” without ever being “loaded.” Loading a roll is what generates its “[code](/words/2019/01/cassette-nest-update-1/).”

Figuring out a good solution to this use case required a lot of thought, reworking both assumptions and a surprising amount of code.

One idea I had was to allow someone to choose the status on the same form they use to add a roll to storage. If they chose a non-storage status, it would lead to an intermediate form to ask more questions. That was a mess.

What I ended up doing was to create an entirely separate form. You either add a roll to storage or you add it to your “Logbook.” There are some subtle differences, but this add-to-logbook form is basically the regular form you use when you edit an existing roll.

{% include components/figure name: 'add-to-logbook.jpg' caption: 'The new form that allows for adding a roll of film directly to someone’s Logbook.' width: 400 %}

It still has a long way to go, but this necessary diversion made the app a lot more useful and it wouldn’t have happened this soon without my early users!
