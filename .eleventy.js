const fs = require('fs');
const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const responsiveImage = require('./src/_includes/shortcodes/responsive-image');

module.exports = function(eleventyConfig) {
    let markdownIt = require('markdown-it');
    let markdownLib = markdownIt({ html: true })
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-collapsible'));

    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addShortcode('responsiveImage', responsiveImage);

    // There’s gotta be a better way of handling this.
    eleventyConfig.addPassthroughCopy('src/img/trey.jpg');

    eleventyConfig.addPassthroughCopy('src/img/sprite.svg');

    // Allow directory json files to add tags to files.
    eleventyConfig.setDataDeepMerge(true);

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addCollection('tagList', require('./getTagList'));

    // https://moment.github.io/luxon/docs/manual/parsing.html#parsing-technical-formats
    eleventyConfig.addFilter('fullDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('cccc, LLLL dd, yyyy');
    });
    eleventyConfig.addFilter('midDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL dd, yyyy');
    });
    eleventyConfig.addFilter('shortDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    // Make 404 page work with `eleventy --serve`
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('dist/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
