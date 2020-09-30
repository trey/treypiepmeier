---
title: 'Cassette Nest: Tracking Film Photography'
date: 2019-01-30
tags: cassettenest
---

## TL;DR

I’m building a web application to track your film inventory before and after it’s been used. It’s called [Cassette](https://en.wikipedia.org/wiki/135_film#Cassette) Nest. It’s pretty rough so far, but I’ve been using it to track my own stuff. I hope to have it ready for other people to test soon. I plan on having a “[freemium](https://en.wikipedia.org/wiki/Freemium)” model of some sort: there will be a (probably annual) subscription fee for some nice bonus features but the basics will be free.

If you’re interested in such things, keep reading!

## [Why?](https://cassettenest.com/why/)

Over the last few years, I’ve come up with a system of tracking how I use my film. This has entailed a few different pieces of software (a fairly fiddly spreadsheet as well as Trello) and a physical notebook (the incomparable [PhotoMemo](https://shootfilmco.com/products/photomemo-photographers-memo-book-2-pack) by [Mike Padua](https://twitter.com/mikepadua)). I’m attempting to build a system to allow me to track of all this information a little more easily.

{% include components/figure name: 'photo-memo-index.jpg' caption: 'The index page of my latest PhotoMemo book' %}

{% include components/figure name: 'photo-memo-copies-and-index.jpg' caption: 'Printouts of a spreadsheet and notebook pages' alt: 'PhotoMemo pages and annual index in sheet protectors ready to be loaded into a film binder.' %}

## The System

The core of this system is having a unique “code” for every roll I shoot in the course of a year. Here’s the system:

1. Format ([35mm](https://en.wikipedia.org/wiki/135_film), [120/medium format](https://en.wikipedia.org/wiki/120_film))
2. Type
    - [Black & White](https://en.wikipedia.org/wiki/Monochrome_photography)
    - [C41](https://en.wikipedia.org/wiki/C-41_process) (standard color negatives)
    - [E6](https://en.wikipedia.org/wiki/E-6_process) (slides/color reversal)
3. Number (the sequence number for each combination of format + type in the given year)

So, for example:

- A roll with the code “`35-c41-11`” would be the 11th roll of 35mm color negative film in a given year.
- A roll with the code “`120-e6-3`” would be the 3rd roll of medium format color slide film in a given year.

(I got the seed of this concept from [Cameron Whitman](https://twitter.com/camrocker) on the [Cameras or Whatever podcast](http://stalman.com/camerasorwhatever/48).)

I then use that number in a few places: my PhotoMemo book, in my spreadsheet, and the notes written on the [Print File sleeves](https://printfile.com/product-category/film-slide-storage/negative-pages/) themselves.

One of the first things I needed Cassette Nest to do was to auto-generate that number as you load a camera with a particular film stock. I overcame several obstacles in getting such a seemingly simple thing to work, but it’s so nice to have now!

## Software is (usually) frustrating to write.

That’s one of the reasons why this project is so special to me: it almost never feels frustrating. I’m solving problems in a way that feels good—rewarding even. Part of that is surely that this is work that I want for myself. Maybe another big part is that I’m clearly defining the boundaries in a way that’s conformable to me. But those were true of my work with [ComicBinder](https://comicbinder.com/purpose), and I never got as far with that as I have with this. To be fair, there is far less structure needed for this compared to what already exists with 100+ years of published comic books. This is a truly personal dataset.

## Archival

The data in Cassette Nest is both personal and archival. I want the data you create in this app to outlive the app. I want the metadata for a roll of film to last as long as the actual negatives. That means a physical aspect of this is very important. Hello, [print stylesheets](https://www.smashingmagazine.com/2018/05/print-stylesheets-in-2018/)! (I need to start working on that.) I’m under no pretense that this app will exist for decades and lifetimes, but it’s important to me that your data does.

## Visual Design

After building out most of the basic functionality, I decided to step back and look at the user interface from a new perspective. I’ve started using [Glitch](https://glitch.com/) to build out individual mobile page views. I’ve posted a couple of screenshots from this process [on Dribbble](https://dribbble.com/trey/tags/cassettenest).

{% include components/figure name: 'cassette-nest-actual-ui.png' alt: 'A very plain interface of text on a white background.' caption: 'How the actual app looks now' %}

{% include components/figure name: 'cassette-nest-prototype.png' alt: 'The design prototype of a mobile-optimized homepage/dashboard' caption: 'A prototype of a possible homepage/dashboard' %}

## Now

Things have stagnated a bit over the couple of months because of the holidays, lots of travel, and interviewing for (and getting!) a new job. However, I hope to jump back into this with both feet and have something ready to beta test soon.

I’ve been working on this in a vacuum. I can’t wait to see what other people think about Cassette Nest once they start using it!
