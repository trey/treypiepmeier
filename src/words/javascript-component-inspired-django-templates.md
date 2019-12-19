---
title: JavaScript Component-Inspired Django Templates
date: 2019-07-19
tags: [technical, cassettenest]
---

When I was starting out writing [Cassette Nest][cn], I went back and forth with “real” code as well as prototypes using React and Vue.

I have a UI concept that I use throughout the app called a “card.” It’s a big, blocky interface that spans the width of the screen. It could show information about a camera, a roll of film, or a project (among other things).

Because I’m developing all of Cassette Nest to work without JavaScript, I needed to convert my prototypes to Django templates.

I built a template for a card that acts very much like a JavaScript component. Every  type of card uses the same template, but its appearance will change depending on the values passed into it (similar to props in Vue or React).

Here are a few ways I include the template (note the Sass-inspired `_` in the filename to indicate that it's intended to be used as an [include][include].):

{% raw %}
```django
{% include '_card.html' with name='Dashboard' location=dashboard_url %}

{% include '_card.html' with name='Ready to process' location=ready_url slot='count' count=rolls_ready_count %}

{% include '_card.html' with name='In storage' location=inventory_url slot='count' count=rolls_storage_count %}

{% include '_card.html' with name=roll.camera.name location=roll_detail slot='reminder' roll=roll %}
```
{% endraw %}

Here’s (a simplified version of) the template itself:

{% raw %}
```django
<section class="c-card c-card--{# ... #}">
  {% if project and film %}
    <form onsubmit="{# ... #}" action="{# ... #}" method="post">
      {# ... #}
      <input type="submit" value="Remove" />
    </form>
  {% endif %}
  <a href="{# ... #}">
    <header><h1>{{ name }}</h1></header>
    {% if slot == 'count' %}
      <div class="c-card__count" title="Number of rolls">
        <span>{# ... #}</span>
      </div>
    {% elif slot == 'reminder' %}
      <section class="c-reminder c-reminder--{# ... #}">
        <header>
          {% if roll.film.iso %}
            <h1 title="{{ roll.film.type|upper }}">
              {{ roll.film.iso }}
            </h1>
          {% endif %}
        </header>
      </section>
    {% endif %}
  </a>
</section>
```
{% endraw %}

_(Please forgive any incorrect [document outlines][outlines]. I'm working on that.)_

Note my use of [OOCSS][oocss]-ish / [BEM][bem]-style classes. That makes writing nested Sass very nice.

```scss
.c-card {
    // ...
    &--film {
        // ...
    &__count {
        // ...
```

Here are some of the ways cards can look:

{% include components/figure name: 'card-film-inventory' ext: 'png' caption: 'Inventory Item showing name, number of rolls, and type of film (background color indicating color negative film)' width: 374 height: 54 %}

{% include components/figure name: 'card-project' ext: 'png' caption: 'Project showing number of rolls of film' width: 374 height: 48 %}

{% include components/figure name: 'card-loaded-camera' ext: 'png' caption: 'Loaded Camera with a “reminder” tab showing film type (background color indicating black and white) and ISO' width: 373 height: 101 %}

I’ve since expanded the concept to certain form fields, which hasn’t been quite as easy of a drop-in solution so far, but it’s a lot easier than duplicating a lot of HTML where it _does_ work.

Look how clean this is!

{% raw %}
```django
{% for field in form %}
  {% include '_form-field.html' with field=field %}
{% endfor %}
```
{% endraw %}

And here’s how it’s defined in the template.

{% raw %}
```django
<div class="c-field {# ... #}">
  <label for="{{ field.id_for_label }}">{{ field.label }}</label>
  <div class="c-field__widget">
    {{ field }}
    {% if field.help_text %}
      <small>{{ field.help_text }}</small>
    {% endif %}
  </div>
</div>
```
{% endraw %}

Anyway, I’m liking this technique and wanted to share it! Is anybody else building pseudo-components in their back-end templates like this?

[cn]: https://app.cassettenest.com
[include]: https://docs.djangoproject.com/en/2.2/ref/templates/builtins/#include
[outlines]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines
[oocss]: https://github.com/stubbornella/oocss/wiki
[bem]: http://alwaystwisted.com/articles/2014-02-27-even-easier-bem-ing-with-sass-33
