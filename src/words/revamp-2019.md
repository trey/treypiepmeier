---
title: Revamp, 2019
date: 2019-12-31
tags: [technical, gratitude]
---

> Would love a blog post about your new setup.
>
> <cite>[Tyler Hall](https://twitter.com/tylerhall/status/1210277998898941954)</cite>

## Background

I had been dissatisfied with my big-page-builder sites for a while, but when I got an email notice that my wordpress.com subscription was coming up for renewal, I dropped working on [Cassette Nest](/words/tag/cassettenest/) for a while and started what ended up being kind of an ambitious (yet immensely satisfying) project of migrating basically three different websites into one.

2019 was a big year for personal growth. I got my ass handed to me career-wise and had to rethink what areas of web development were still interesting to me. For a while, I had been using big name, hosted page builders (Squarespace and WordPress) for some of my sites. I was increasingly bothered by those choices.[^1]

I was bothered by how many other sites looked exactly like mine and the fact that my chosen Squarespace template wouldn’t render anything if you didn’t have JavaScript enabled. For a brief time, I was thinking WordPress was the answer. I even toyed with the idea of focusing my career on WordPress development. Thankfully, I was able to pull myself away from that path to one I think suits me much better (career-wise and website-wise).

What emerged in my figuring out [what still interests me about web development](https://twitter.com/trey/status/1149029086188244994) was being able to take a stand on things like progressive enhancement, accessibility, and performance. If I build sites from scratch, I control everything that lands in the browser. No weird tracking codes or JavaScript-dependent rendering. It’s all mine from corner to corner on the page and top to bottom in the source code.

Now on to the nitty-gritty of how I put this site together.

## [11ty](https://www.11ty.dev)

For the last several months, I’ve been reaching for 11ty for almost any little project I’ve had in my mind. Anything from my résumé to refactoring [my Stephen King checklist](https://sk.listsofbooks.com). I love it for many reasons. I think it’s the first non-[Django](https://www.djangoproject.com) web technology that has really captured my imagination. As with Django, I rarely feel frustrated by it. It’s something I can figure out on my own in almost every situation and build what I have in my mind. The difference with 11ty is that it all ends up as lightning fast HTML and CSS without a database in sight. Not great for “apps,” but absolutely wonderful for everything else.

The bulk of the work for this project was getting blog posts looking and acting just like I wanted. 11ty is amazingly flexible and can do pretty much whatever you can imagine a static site generator can do. Because of that flexibility, it’s not as quick out of the box to build a blog as is something like Jekyll. I think it’s a fair trade off and I’d put up with a lot more to not have to deal with Ruby thank you very much.

## Navigation

### Adjacent Blog Posts

Maybe the hardest part of getting blog posts working like I wanted was getting navigation (to the previous and next posts) at the bottom of any given blog post.

Here’s the idea:[^2]

---

<div style="display: flex; justify-content: space-between">
    <div><a>← Newer Post Title</a></div>
    <div><a>Older Post Title →</a></div>
</div>

---

Newest to oldest. Left to right. You read your typical blog (or social network) from newest to oldest. It only makes sense for that to be the direction of the navigation. Why do so many places get this backwards?

I managed to figure out how to get this working based on [something Duncan Davidson had done](https://twitter.com/trey/status/1205301626661195777), but I’ve since seen what’s [probably a much cleaner way](https://twitter.com/BryceWrayTX/status/1208737887858167811). I haven’t tried that out yet, though. It’s not like the output will be any different and I’ve got it hidden away in an `include` anyway. 😃

### Main Navigation

Then there’s the main navigation (`Home`, `Blog`, `About Me`, etc.). The way I wanted that to work was that if you were currently on a page, that text would be highlighted (of course), but it would no longer be a redundant link. If you were within a section, like Blog (or “Words” in my case) but you were on a blog post page (not just `/words/`) then the text would be highlighted and it would still be a link so that you could use it to go back to the main page for that section.

Here’s the whole thing (`main-nav.njk`):

{% raw %}
```django
<ul class="nav">
{%- for item in nav -%}
    {# We have to treat Home differently because every url contains `/`. #}
    {%- if item.name == 'Home' %}
        {%- if item.url != page.url %}
    <li class="nav__item"><a href="{{ item.url }}">{{ item.name }}</a></li>
        {%- else %}
    <li class="nav__item nav__item--current"><span>{{ item.name }}</span></li>
        {%- endif %}
    {%- else %}
    <li class="nav__item {% if item.url in page.url %}nav__item--current{% endif %}">
        {%- if item.url != page.url -%}
        <a href="{{ item.url }}">{{ item.name }}</a>
        {%- else -%}
        <span>{{ item.name }}</span>
        {%- endif -%}
    </li>
    {%- endif %}
{%- endfor %}
</ul>
```
{% endraw %}

That’s pretty good, right? Maybe it’s not the cleanest template code, but I think it’s fairly understandable and it does _exactly_ what I want.

## Images

Other than navigation, the other big, fun project was getting (potentially quite large) images working exactly how I wanted. Which is to say, sending only as large an image as would be appropriate based on the size of your screen.

To do this, I use [the magical `srcset` attribute](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/). Here’s how I would insert an image into a Markdown post (which, inside 11ty, uses [Liquid](https://shopify.github.io/liquid/) as a rendering engine which means that you can magically use `include` statements wherever you want!):

{% raw %}
```django
{% include components/img name: 'cat' alt: 'A photo of a cat.' %}
```
{% endraw %}

Which will output something like this: [^3]

```html
<img src="/img/cat-original.jpg"
     alt="A photo of a cat."
     srcset="/img/cat-small.jpg 800w,
             /img/cat-medium.jpg 1600w,
             /img/cat-large.jpg 2200w" />
```

<!-- _(Side side note, [I hate having to do anything with Shopify](https://twitter.com/trey/status/830094237572202496) technology [Liquid templates], but at least I’m not subjecting people who view my website to any of their code directly and I sure as hell am not giving them any money. Maybe I should look into getting Nunjucks to work for rendering Markdown.)_ -->

In order to generate all those different sized images (and not keep them in source control!), I simply run some code in my [`.eleventy.js` file](https://www.11ty.dev/docs/config/) (which is basically a list instructions for rendering an 11ty site) which takes image files in a given folder, creates different versions of them, and puts them into an output folder.[^4]

On top of the standalone `img` “component,” I also have a `figure` component which itself calls the `img` component. You use it like this:

{% raw %}
```django
{% include components/figure
    name: 'rosie'
    caption: 'It looks pink in some light'
    alt: 'The lid of my new MacBook Air'
%}
```
{% endraw %}

That will output something like:

```html
<figure>
    <img src="/img/rosie-original.jpg"
         alt="The lid of my new MacBook Air"
         srcset="/img/rosie-small.jpg 800w,
                 /img/rosie-medium.jpg 1600w,
                 /img/rosie-large.jpg 2200w" />
    <figcaption>It looks pink in some light</figcaption>
</figure>
```

This is a nice, clean, semantic, easy-to-style way to put a caption on an image.

### SVG Icons

I was able to repurpose some code I have in [Cassette Nest](http://cassettenest.com) (written in Django, whose template language is delightfully similar to the two templating languages I’m using [[Nunjucks](https://mozilla.github.io/nunjucks/) and Liquid]) and a simple, hand-made SVG sprite to get something like this to render an icon:

{% raw %}
```django
{% include components/icon id: 'twitter' title: 'Twitter' %}
```
{% endraw %}

Which will output something like this:

```html
<svg role="img">
    <title>Twitter icon</title>
    <use xlink:href="/img/sprite.svg#twitter"></use>
</svg>
```
## Syntax Highlighting

[Syntax highlighting for code snippets is trivially simple with 11ty.](https://www.11ty.dev/docs/plugins/syntaxhighlight/) This one was quite a bonus that made the whole thing worth it for me all over again. For comparison, I never could figure out a good way to do this with WordPress. Here, you install the plugin, and pick [a theme](https://draculatheme.com), include the theme’s CSS file and you’re done. It’s worth noting that this is all handled without any client side JavaScript. All the beautiful syntax highlighting works even when JavaScript is disabled in your browser.

## [Netlify](https://www.netlify.com)

The other component to this mix is the almost-too-good-to-be-true host, Netlify. I think I first heard of Netlify from this tweet.

> Rough estimate: every site I move to  [@netlify](https://twitter.com/Netlify)  lowers my baseline stress level by 10%.
>
> <cite>[Wilson Miner](https://twitter.com/wilsonminer/status/726187885871820800)</cite>

I was immediately intrigued. Who wouldn’t want that? You can deploy a site by pushing to a Git repository.

When I first started using it, they put a badge on your sites if you were on a free account; “Powered by Netlify” or something like that. At some point they removed that and I haven’t hit any limit of their system where I would need to pay. This is why I say it’s almost too good to be true. Is this the result of overzealous VC-funding? I despise that kind of growth-above-all mindset _(note to self: write a blog post about this)_, but in this case it’s a huge personal benefit to me. For now.

The nice thing about investing time and energy in 11ty (or any static site generator) is that it would be easy to make it work on any hosting company you want. So I’ll enjoy Netlify while it lasts and switch to something like [DigitalOcean](https://www.digitalocean.com) (which is awesome because they don’t depend on AWS while every other damned thing on the internet has no problem depending on them) if the need ever arises.

## Redirects

As I mentioned before, this project was migrating three[^5] sites into one. As a part of that migration, I want to break as few links as possible. I’m actually letting some terrible blog posts decay, but quite a few of them I want to save.

[Netlify lets you do this quite easily.](https://docs.netlify.com/routing/redirects/redirect-options/) I just replaced the repository for my old blog (words.treypiepmeier.com) with a new repository that was just a `_redirects` file. It looks something like this:

```text
/              https://treypiepmeier.com/words/
/fake/         https://treypiepmeier.com/words/fake/
/another-fake/ https://treypiepmeier.com/words/another-fake/
# …
```

I probably could have used wild cards, but this was the quickest thing for me to figure out.

Similarly on [treylabs.com](https://treylabs.com) (which was formerly on wordpress.com), I just added a `_redirects` file (and a little `.eleventy.js` rule to copy that one file to the published folder). It’s pretty similar to the words.treypiepmeier.com one, but note that I moved individual blog posts to different blogs (one of which I haven’t make public yet) on my new site. You can’t do that with wildcard matching!

```text
/blog/         https://treypiepmeier.com/words/
/fake/         https://treypiepmeier.com/something/fake/
/another-fake/ https://treypiepmeier.com/words/another-fake/
# …
```

## Bonus: Sass Organization

This isn’t really dependent upon the stack we’re talking about here, but I managed to sort out a Sass organization scheme that I really like at least for something this small.[^6]

Getting Sass to work in 11ty isn’t a perfect expereience out of the box. I’ve got it sorted out in [my Blank Slate v2 project](https://github.com/trey/blank2), so I go from there. That as well as having to put your `scss` folder in the `_includes` folder will hopefully be fixed in future versions of 11ty.

Here’s my Sass structure.

```text
src/_includes/scss/
    base/
        _all.scss
        _reset.scss
        …
    components/
        _all.scss
        _main-nav.scss
        …
    modules/
        _all.scss
        _colors.scss
    pages/
        _all.scss
        _home.scss
        …
    vendor/
        _all.scss
        _prism.scss
        …
    main.scss
```

And here’s what’s in the single file that the project uses (`main.scss`):

```scss
@import 'vendor/all';
@import 'modules/all';
@import 'base/all';
@import 'components/all';
@import 'pages/all';

// Have a nice day.
```

Most of those `_all.scss` files are just simple indexes of anything in their respective subfolders, loaded exactly as I want them to be loaded. Here’s an exception, though (`pages/_all.scss`):

```scss
body {
  &.home { @import 'home'; }
  &.posts { @import 'posts'; }
}
```

Then I have logic in my base Nunjucks template to add an optional class to the body tag:

{% raw %}
```html
<body {% if bodyClass %} class="{{ bodyClass }}"{% endif %}>
```
{% endraw %}

The only other thing to do is to put something like `bodyClass: home` in the [front matter](https://www.11ty.dev/docs/data-frontmatter/) of the page you want to have a custom class.

How cool is that?! Come on.

This leaves the individual `pages/` files free from any class name dependencies. This just makes me happy. [I’ve long been a proponent for this kind of setup.](https://codepen.io/trey/post/nesting-sass-includes), but this is the cleanest way I’ve found of implementing it.

## Conclusion

It feels good to finally have a place where I’m not embarrassed to share something I’ve written. A place where it’s obvious that this is a custom thing that at the very least doesn’t suck. It’s not a sloppy custom thing and it’s not a damned out of the box theme. 11ty has given me something that I feel that I can use to make exactly what I want the way I want without any compromise.

<!-- I will be making this code public on GitHub at some point, but I’m kind of like keeping this one under wraps until I’m certain it’s *just* how I want it to be. 😎 -->

[^1]: I guess this is goodbye to any chance of getting a podcast sponsorship.

[^2]: How cool is it that I can throw some raw HTML into this blog post to simulate the navigation and it just works? Try doing that on your blog!

[^3]: This was unexpected: I can apparently just repeat the aforementioned `include` code without wrapping it with [`raw` Liquid tags](https://shopify.github.io/liquid/tags/raw/) to show what it renders on the blog here. That blew my mind! However, it’s better to include the real output for the sake of the Markdown containing the full contents of this blog post. What a great way to visually check what your templates are rendering, though. Just wrap an `include` in a Markdown [fenced code block](https://www.markdownguide.org/extended-syntax/#fenced-code-blocks)!)

[^4]: I got the bulk of this working in my [avarmint](https://github.com/trey/avarmint-11ty) project, but I fixed a little issue where it would take a loooong time to re-render the site any time you changed the `.eleventy.js` file. Now, I just check for the existence of the output files before rendering them. It went from around a full minute to refresh when changing the file to about a quarter of a second.

    I feel like I’m writing the most crude JavaScript to get this stuff to work, but it really doesn’t matter since this is run once when the site builds and all the user ends up seeing is fast HTML and optimized images.

[^5]: Although I haven’t fully launched the third one and it isn’t strictly in a single location even now.

[^6]: ITCSS is way too complicated for most things if you ask me.
