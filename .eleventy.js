const fs = require('fs');
const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const responsiveImage = require('./src/_includes/shortcodes/responsive-image');
const typographyPlugin = require('@jamshop/eleventy-plugin-typography');

module.exports = function(eleventyConfig) {
    let markdownIt = require('markdown-it');
    let markdownLib = markdownIt({ html: true, typographer: true, linkify: true, })
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-collapsible'));
    const md = new markdownIt({ linkify: true });

    eleventyConfig.addWatchTarget('src/scss');
    eleventyConfig.setLibrary('md', markdownLib);
    eleventyConfig.addShortcode('responsiveImage', responsiveImage);

    // There’s gotta be a better way of handling this.
    eleventyConfig.addPassthroughCopy('src/img/trey.jpg');
    eleventyConfig.addPassthroughCopy('src/img/sprite.svg');
    eleventyConfig.addPassthroughCopy('src/img/**/*.gif');
    eleventyConfig.addPassthroughCopy('src/robots.txt');

    // Allow directory json files to add tags to files.
    eleventyConfig.setDataDeepMerge(true);

    // Plugins
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(typographyPlugin);

    eleventyConfig.addCollection('tagList', require('./getTagList'));

    eleventyConfig.addCollection('links', collectionApi => {
        return [...collectionApi.getFilteredByTags('links')].sort(
            (a, b) => {
                const aDate = DateTime.fromISO(a.data.postDate);
                const bDate = DateTime.fromISO(b.data.postDate);

                return aDate - bDate;
            }
        );
    });

    // https://moment.github.io/luxon/docs/manual/parsing.html#parsing-technical-formats
    eleventyConfig.addFilter('fullDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('cccc, LLLL dd, yyyy');
    });
    eleventyConfig.addFilter('fullDateISO', dateObj => {
        return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('cccc, LLLL dd, yyyy');
    });
    eleventyConfig.addFilter('midDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL dd, yyyy');
    });
    eleventyConfig.addFilter('midDateISO', dateObj => {
        return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('LLLL dd, yyyy');
    });
    eleventyConfig.addFilter('shortDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });
    eleventyConfig.addFilter('shortDateISO', dateObj => {
        return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter('markdown', value => md.render(value));

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter('head', (array, n) => {
        if( n < 0 ) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // Make 404 page work with `eleventy --serve`
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('public/404.html');

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
            output: 'public',
        },
    };
};
