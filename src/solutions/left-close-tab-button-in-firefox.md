---
title: Close Tab Icon/Button on the Left in Firefox
date: 2019-09-26
tags: browser
---

Update _Friday, December 31, 2021_:

Ok, maybe [this solution](https://gist.github.com/biosmanager/93544485fb0da3ad0577856186b9b3e8) is pretty alright ([via](https://www.reddit.com/r/firefox/comments/nriwz5/close_tab_button_on_left_side_for_macos/)). I've updated the code in this post with that.

~~Update _Thursday, June 3, 2021_:~~

~~With [the new version of Firefox](https://www.mozilla.org/en-US/firefox/89.0/releasenotes/), it's probably no longer worth fighting the non-Mac right-side close buttons. Oh well.~~

---

As a good and loyal Mac user, I know that the little button to close a tab (or window or modal dialog, etc.) should be on the left, not the right. Here’s how you can make Firefox a little less ugly.

{% include components/figure name: 'safari-tab.png' alt: 'Safari tab' caption: 'Safari. So pretty.' width: 409 height: 41 %}

<figure>
    <img alt="Firefox tab with close button animating in place of the favicon when you hover over the tab." src="/img/solutions/ff-left-tab.gif" width="297" height="65" />
    <figcaption>Firefox. Now a little prettier.</figcaption>
</figure>

1. Go to `about:support`.
2. Click on “Show in Finder” next to “Profile Folder.”
3. Create a folder inside that folder called `chrome`.
4. Create a file called `userChrome.css` in that new folder.
5. Paste the following code into that new file:

```css
.tabbrowser-tab .tab-throbber,
.tabbrowser-tab .tab-icon-image,
.tabbrowser-tab .tab-sharing-icon-overlay,
.tabbrowser-tab .tab-icon-overlay,
.tabbrowser-tab .tab-label-container,
.tabbrowser-tab .tab-icon-sound {
  -moz-box-ordinal-group: 2 !important;
}
.tabbrowser-tab .tab-close-button {
  margin-left: -5.5px !important;
  margin-right: 3px !important;
}
.tabbrowser-tab:not([pinned="true"]):hover .tab-close-button {
  display: -moz-box !important;
}
.tabbrowser-tab:not([pinned="true"]):hover .tab-icon-image,
.tabbrowser-tab:not([pinned="true"]):hover .tab-throbber {
  display: none;
}
.tab-close-button {
  display: none;
}
```

6. Go to `about:config`
7. Search for `userprof`
8. Double-click that entry to change it from false to true.
9. Restart Firefox

## Sources:

- [A close button on the left of each tab | Firefox Support Forum | Mozilla Support](https://support.mozilla.org/en-US/questions/1157451)
- [How to Create a userChrome.css File](https://www.userchrome.org/how-create-userchrome-css.html)
- [Tab close button on the left in Firefox Quantum](https://gist.github.com/henrik242/3abf4c52ebf81add5cfe38acf97c2053)
