---
layout: layouts/words.njk
title: Close Tab Icon/Button on the Left in Firefox
date: 2019-09-26
tags: browser
---

As a good and loyal Mac user, I know that the little button to close a tab (or window or modal dialog, etc.) should be on the left, not the right. Here’s how you can make Firefox a little less ugly.

<figure>
    <img src="https://trey-bucket.s3.us-east-1.amazonaws.com/.codepen-solutions-log/safari-tab.png" alt="Safari tab" />
    <figcaption>Safari. So pretty.</figcaption>
</figure>

<figure>
    <img src="https://trey-bucket.s3.us-east-1.amazonaws.com/.codepen-solutions-log/ff-left-tab.png" alt="Firefox tab" />
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
      margin-left: -2px !important;
      margin-right: 4px !important;
    }
    ```

6. Go to `about:config`
7. Search for `userprof`
8. Double-click that entry to change it from false to true.
9. Restart Firefox

## Sources:

- [A close button on the left of each tab | Firefox Support Forum | Mozilla Support](https://support.mozilla.org/en-US/questions/1157451)
- [How to Create a userChrome.css File](https://www.userchrome.org/how-create-userchrome-css.html)
