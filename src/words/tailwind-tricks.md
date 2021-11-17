---
title: Tailwind Tricks
date: 2021-11-17
tags: technical
---

<a href="https://www.flickr.com/photos/trey_piepmeier/50752641598/">
{% include components/img
  name: 'clothespin-bird.jpg'
  alt: 'A clothespin stuck to a tree branch with a pink feather attached to it.'
%}
</a>

I’m currently in the process of building an [all-new, all-different](https://en.wikipedia.org/wiki/Uncanny_X-Men_94) [Cassette Nest](https://cassettenest.com). Part of that is using [Tailwind](https://tailwindcss.com), which is amazing and [you should use it](https://twitter.com/trey/status/1457854984020762626).

I wanted to share a couple of things I figured out yesterday. The first is [a light/dark theme picker with the option to use the OS-level preference](/solutions/2021/11/dark-mode-preact/). It’s only Tailwind related in that it uses [its `class` `darkMode` technique](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually).

The second is [an explanation of how to use `@responsive` in Tailwind](/solutions/2021/11/tailwind-responsive/). The documentation was inscrutable to me, so I figured I’d write up an explanation that makes sense to me. It’s pretty cool, and not as complex as it seemed.
