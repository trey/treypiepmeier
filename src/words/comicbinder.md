---
title: ComicBinder
date: 2014-06-26
tags: project
---

For as long as I can remember, I've wanted to be able to catalog my comic books. When I was nine years old, that meant keeping a notebook with a line for each possible issue of a series. The idea started as a way to give me piece of mind in case I needed to file an insurance claim should I lose my collection in a fire.

[{% include components/img alt: 'ComicBinder Circa 1986' imgTitle: 'ComicBinder Circa 1986' name: 'comicbinder-notebook.jpg' %}](https://www.flickr.com/photos/trey_piepmeier/14537046953/)

This is the kind of thing that kept me up as child around thirty years ago.

About eight years ago, I started envisioning [a solution to this problem][cb] again. This time, it wasn't just for insurance purposes. It was more so that I could conceivably get rid of the bulk of my collection, but I wanted to do it in a way where I felt like I wasn't giving away something potentially valuable. I didn't want to sell something for less than it was worth[^1].

Back then, I figured it could be solved by creating a web app. These were the early days of the MVC web frameworks (Ruby on Rails, Django), and I was in the early days of being a web professional[^2]. As I thought through what would be involved in creating such a thing[^3], I slowly realized how complex it would be.

I got discouraged.

My mindset since those days has become one of trying to find existing tools if possible instead of trying to create something new. For one thing, I don't give new web apps much merit. Even things that look amazing; sites that I submit my email address in the hopes of at the very least [landing my username][marriedtothesea], I rarely care about once I get the email that the serviced has launched[^4]. For another, writing new services that people depend on is hard[^5]. I didn't know if I had the skills or desire to take on that task.

For the past several years, I've opted to use an off-the-shelf database. [Comic Collector][cc], while it's thorough, is terrible to use. Its interface is inscrutable. No matter how long I use it, I have to relearn how to do fundamental things all the time. It looks like it was designed by someone who'd just as soon keep track of their collection in a spreadsheet or by [writing SQL queries by hand][sql].

Cut to today. After talking with someone at [GIANT Conf][giant] about [a (now stagnant) service][comicrelay] that had a similar goal[^6], I started thinking about this again. Today is a different world than eight years ago. Today I'm inspired by things like [Letterboxd][letterboxd]. I'm inspired to not be the total train wreck of a UI of Goodreads and Comic Collector. I'm inspired to make something that's different enough and better enough than anything else out there that it has the possibility of surviving. Something that is at a minimum an app that I would use myself from now until forever.

I'm still not a sysadmin. I'm still not a great programmer. I feel like I can barely manage to get out of my own way when I'm coding. But what matters is I'm (again) developing a vision for what I want this to be and I feel like I know enough more than I did eight years ago that I could see this happening in a usable way that more than a handful of people will use.

But, we'll see. I'm going to try to continue writing about this as I go along. Maybe if I get feedback, I'll be inspired enough to keep going until I get it to version 1.0.

[^1]: It's doubtful this would actually matter. In the case of the bulk of my collection, they're probably not worth the paper they're printed on.
[^2]: In as much as I was getting paid to write nominal HTML and CSS at an amateur level.
[^3]: Photoshopping interfaces, diagramming database structures (including ER diagrams), and even starting some wretched backend code in Rails and Django.
[^4]: If I can even remember what it is.
[^5]: See what I'm talking about? [1][editorially], [2][readmill], [3][mlkshk]
[^6]: Get rid of your comics! Also, get them into the hands of someone else who cares rather than just throwing them away.

[cc]: http://www.collectorz.com/comic/
[marriedtothesea]: http://www.marriedtothesea.com/121909/wisdom-of-the-ancients.gif
[mlkshk]: http://mlkshk.typepad.com/mlkshk/2014/04/goodbye.html
[readmill]: https://readmill.com/epilogue
[editorially]: http://stet.editorially.com/articles/goodbye/
[comicrelay]: http://comicrelay.com/
[letterboxd]: http://letterboxd.com/purpose/
[giant]: http://2014.giantconf.com/
[sql]: http://xkcd.com/327/
[cb]: http://comicbinder.com
