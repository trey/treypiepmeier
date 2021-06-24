---
title: There’s now a Links section on this website.
date: 2021-06-24
tags: [technical, gratitude]
---

[Here it is.](/links/)

I’ve long been inspired by the likes of [Gruber](https://daringfireball.net/linked/) and [Kottke](https://kottke.org/quick-links/) with their link blogs, but it wasn’t until I saw [this tweet by Laura Kalbag](https://twitter.com/LauraKalbag/status/1400394298919641089) that I was inspired to make one of my own on my (still [recent-feeling](/words/2019/12/revamp-2019/)) [11ty](https://www.11ty.dev)-powered website. Like Laura’s, mine also has [its own RSS feed](/feeds/links.xml).

You can click through directly to the external link by clicking the star (reversed from the way Gruber does it) and read my notes by clicking the title.

## Gratitude

I would not have tried this if not for [this video](https://egghead.io/lessons/11ty-generate-eleventy-11ty-pages-from-external-data) by [Stephanie Eckles](https://twitter.com/5t3ph).

## Boring Technical Stuff

I'm pulling data from [Pinboard’s API](https://pinboard.in/api/) so I don’t have to do anything other than give bookmarks a particular tag for them to show up on my website the next time it’s re-rendered. I’m experimenting with some [IFTTT](https://ifttt.com) stuff to get it to re-render at appropriate times. It may end up just being a once-a-day thing, since I can’t rely on the IFTTT trigger of a new bookmark since I often post things un-tagged (via liking something on [Instapaper](https://www.instapaper.com)) and go back and add tags later.
