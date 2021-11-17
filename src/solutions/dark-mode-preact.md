---
title: Dark Mode with (P)React
date: 2021-11-17
tags: [tailwind, javascript]
---

There are three basic parts to this.

1. Adding or removing a `dark` class from the `<html>` tag ([Tailwind-style](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)).
2. Saving that preference in [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).
3. Changing the mode in real time as different options are selected or the system’s mode changes.

Let’s start by loading the setting if it’s already set in `localStorage`. Put the following somewhere in the `<head>` of your document so there hopefully won’t be any flash of a different mode when the page loads. Just some basic vanilla JavaScript so far…

```html
<script>
  if ('theme' in localStorage) {
    document.documentElement.classList.add(localStorage.theme);

    if (window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.theme === 'system') {
      document.documentElement.classList.add('dark');
    }
  }
</script>
```

This will add whatever the `theme` option is as a class on the `<html>` tag and an additional `dark` class if the person's system is set to that mode and they've chosen the `system` option.

Now we'll work in the component file of your choice. Let's create some [hooks](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state#state_and_the_usestate_hook) to store and update as needed.

```javascript
const [darkMode, setDarkMode] = useState(null);
const [systemMode, setSystemMode] = useState(null);
```

Now let's create a way for someone to choose the option they want. I'll leave it as an exercise for the reader to create the little icon components I'm using here (they're just thin wrappers around SVGs).

```jsx
<div class="js-only">
  <button onClick={() => handleModeChange({dark: false, system: false})}>
    <Sun selected={(!darkMode && !systemMode)} />
  </button>
  <button onClick={() => handleModeChange({dark: true, system: false})}>
    <Moon selected={(darkMode && !systemMode)} />
  </button>
  <button onClick={() => handleModeChange({system: true})}>
    <Computer selected={(systemMode)} />
  </button>
</div>
```

Now for the tricky bit. Let's update things as needed, including when someone changes their system preferences and the `system` option is selected.

```javascript
const handleModeChange = ({ dark, system }) => {
  setDarkMode(dark);
  setSystemMode(system);

  if (system) {
    localStorage.theme = 'system';
    document.documentElement.className = localStorage.theme;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } else {
    localStorage.theme = (dark) ? 'dark' : 'light';
    document.documentElement.className = localStorage.theme;
  }
};

useEffect(() => {
  if (localStorage.theme === 'system') {
    setSystemMode(true);
  } else {
    setSystemMode(false);
    setDarkMode((localStorage.theme === 'dark'));
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.theme === 'system') {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  jsReady();
}, []);
```

Note that the `[]` at the end of that `useEffect` means that it will only run on the initial page load.

---

## Bonus progressive enhancement

The `jsReady()` function and `js-only` class are to hide this whole thing if JS isn't enabled. Since I'm using [Astro](https://astro.build), I can hydrate the page on load if JS is available and then show this UI.

In a Tailwind-ified CSS file (I don't think you'll have problems extrapolating the plain CSS for this)…

```css
@layer utilities {
  /* Other stuff… */

  .js-only { @apply hidden; }
}
```

Then somewhere in a utility JS file…

```javascript
const jsReady = () => {
  // Show things that only work with JS.
  document.querySelectorAll('.js-only').forEach((element) => {
    element.classList.remove('js-only');
  });
};
```
