---
title: Using Tailwind’s Responsive Breakpoints in Custom CSS
date: 2021-11-17
tags: ['tailwind', 'css']
---

Sometimes you want to use custom CSS with Tailwind so you don't have to duplicate class names all over the place. And, of course, sometimes you need to write custom CSS that Tailwind can't do. If you need to do the latter, sometimes you want to hook into the same breakpoints you can everywhere else in Tailwind with things like `md:block` or whatever. Here's how to do it.

The (normally wonderful) [official documentation](https://tailwindcss.com/docs/functions-and-directives#responsive) puzzled me for a long time. It shows you how to set it up…

```css
@responsive {
  .custom-class {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%, 0% 80%);
  }
}
```

But then what? I thought maybe you'd use it by just prefixing the class with `sm`, `md`, etc., but that ain't it.

You need to add custom rules for whatever thing you want to target in a breakpoint. For example…

```css
@responsive {
  .folded-corner {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20% 100%, 0% 80%);
  }

  .solid-corner {
    clip-path: none;
  }
}
```

Then you can use it like so…

```html
<div class="folded-corner md:solid-corner">
  Neat box with folded corner that is unfolded at larger screen sizes.
</div>
```

A simple example like that ought to be added to the Tailwind documentation. 😀

Thanks to [this post and video](https://web-crunch.com/posts/how-to-extend-tailwind-css) for helping me understand.
