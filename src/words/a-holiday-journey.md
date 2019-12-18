---
title: A Holiday Journey
date: 2015-01-25
tags: project
---

**Note:** This was written on December 19, 2014 and subsequently edited. Probably not edited enough.

---

As I have done a few times in my tenure as an employee at [Emma][emma], I’ve managed to use so few vacation days throughout the year that I ended up taking a chunk of time off at the end of the year. This year, since Olivia was working for a full week longer than I was, I decided to use the time to get some work done on [ComicBinder][cb-blog]. My goal was to flesh out a mobile prototype I’ve been working on for the past couple of months.

## The Prototype

It started [on paper][dribbble-sketch], then moved to [Photoshop and InVision][dribbble-animated]. At some point, it felt very tedious having to tweak things in Photoshop and export a ton of screens again and again. [^sketch] InVision is really neat, but it feels so clunky compared to using HTML, CSS, and JavaScript.

So I set off to build the thing out in code. I lost a ton of velocity. It hadn’t *stopped*, but it’s slowed down considerably. It started off alright with just hacking together some nasty jQuery spaghetti to get certain things to show or hide. Then I started thinking, “This would be faster if I had some proper JSON to work with,” [^sane] and then I could start using Backbone & Marionette to start building something that was *even closer* to something “real.” Since I felt like I had learned enough of the basics of both Backbone and Marionette to do that in a reasonable amount of time, I thought it would be a good route to take.

## The Holiday Journey

That brings me to my holiday journey into Marionette and REST. I’ve recently set up  shop [^remote] at a place called [Studioboro][studioboro]. Rather than sit alone at home while I wasn’t “at work” this week, I decided to spend time at the office to work on my prototype.

As I type this today, on the Friday afternoon of my week of trying to treat working on this prototype as a “job,” I am not one bit closer to my goal of having a mobile prototype to show off than I was on Monday morning.

That’s not to say I haven’t learned a ton or that I haven’t carved an amazing new path towards something more “real” than a prototype, though. I’ve worked through near the entirety of *[Backbone.Marionette.js: A Gentle Introduction][marionette-book]*. I’ve used [Marionette Modules][marionette-modules] for the first time. I’ve played with [Firebase][firebase]. I’ve taken the plunge once again into the world of [Django][django].

Yesterday afternoon, I got very discouraged. I was so mad at myself. I was wrestling with a seemingly simple problem of wiring up my Marionette application with Firebase. I had started off the day getting *some* things to work with it nearly instantly. Then I was stuck. [^twenty-twenty] I was ashamed for losing myself in the weeds; for losing sight of the goal I had set out to accomplish. I should have been doing this entire thing as quickly as possible; good coding be damned.

I don’t think I’m wired to do that. Which is not to say that I don’t half ass things. I most definitely do. Certain things, anyway.[^css] It’s not that I have to *understand* every coding concept that I use, but I do want to be able to understand what I’ve written enough to be able to maintain it and build from it. I can’t just throw a bunch of nasty shit into my text editor and forget about it. I optimize (probably prematurely) again and again.

So I stepped away from the computer. When my mind is raging, I do not think clearly. I walked away and went home and did things with my hands. I wrapped Christmas gifts.

Today, I started off with a renewed desire to follow this rathole of a prototype one level deeper; I decided to create an API for my prototype using [Django REST framework][drf]. I still think this may be a complete waste of my time, but there’s something about Django that still grabs me after all these years. Being able to hack a few things together and get an [administration interface][django-admin] is like magic. And now, being able to do that and, seemingly, create a RESTful API is yet another level of magic.

As I take the time to ramble on in this blog post, I’m trying to be accepting of where this week-long journey has taken me and not be ashamed or frustrated with myself. Now I know myself a little bit better. I know what I’d do when given free reign over my time with no restriction on being “productive” or profitable. Maybe I would do things differently if given the opportunity again [^differently], but I have gotten a lot of stuff into my psyche that wasn’t there before. I have a deeper understanding of a lot of technologies and, even though I don’t fully understand them, [^no] I know better now what clicks with me and feels right.

[^sketch]: I’ve since begun to learn the wonders of [Sketch][sketchapp].
[^sane]: No sane person ever thought those words.
[^remote]: Remote working for Emma.
[^twenty-twenty]: I since figured out (as much I can with my still rudimentary understanding of such things) that my problem was a latency issue when fetching a single record from the JSON feed. It wasn’t Firebase’s fault. The same thing happened when I was dealing with only local data.
[^css]: I still can’t bring myself to write messy HTML and SCSS.
[^differently]: Yes.
[^no]: Not even close.

[emma]: http://myemma.com
[cb-blog]: /2014/06/comicbinder/
[dribbble-sketch]: https://dribbble.com/shots/1652576-Issue-Page
[dribbble-animated]: https://dribbble.com/shots/1771878-Issue-Modal-Animated
[sketchapp]: http://bohemiancoding.com/sketch/
[studioboro]: http://studioboro.com/
[drf]: http://www.django-rest-framework.org/
[marionette-book]: https://leanpub.com/marionette-gentle-introduction
[marionette-modules]: http://marionettejs.com/docs/v2.4.7/marionette.module.html
[firebase]: https://www.firebase.com/
[django]: http://djangoproject.com
[django-admin]: https://docs.djangoproject.com/en/1.7/intro/overview/#a-dynamic-admin-interface-it-s-not-just-scaffolding-it-s-the-whole-house
