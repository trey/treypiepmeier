---
title: Single, Double, and Curly Quotes
date: 2019-02-28
tags: technical
---

Here are my opinions on when you should use different kinds of quotation marks in code and prose.

- Single: `'`
- Double: `"`
- Curly: `“`, `‘`, `’`, `”`

## Single-Quotes

Efficiency and clean looks matter most with programming languages (Python, JavaScript, etc.). Use single quotes here.

```javascript
// JavaScript
alert('Hello, world!');
```

```scss
// CSS/Sass
@import 'partials/breakpoints';
```

Note the `'example'` within the Django code block nested in HTML here:

{% raw %}
```django
<!-- HTML/Django template -->
<a href="{% url 'example' example.id %}">{{ example.id }}</a>
```
{% endraw %}

## Double-Quotes

HTML should use double-quotes. It’s more public ([view source](https://css-tricks.com/view-source/)), so it should feel a little more official. HTML feels old fashioned in a way that befits double quotes.

```html
<img src="http://example.com/fish.png" alt="A fish" />
```

## Curly-Quotes

Any text intended solely for reading should use [proper curly quotes](http://smartquotesforsmartpeople.com/).

> “Dodging and burning are steps to take care of mistakes God made in establishing tonal relationships.”
>
> <cite>Ansel Adams</cite>

> “Life is full of pain. Let the pain sharpen you, but don’t hold on to it. Don’t be bitter.”
>
> <cite>Trevor Noah</cite>
