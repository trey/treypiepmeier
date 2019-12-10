const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const fs = require('fs');
const { DateTime } = require('luxon');
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('markdown', value => md.renderInline(value));

    // Copy unaltered original images.
    eleventyConfig.addPassthroughCopy('src/img');

    // Allow directory json files to add tags to files.
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addCollection('tagList', require('./getTagList'));

    eleventyConfig.addFilter('readableDate', dateObj => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('cccc, LLLL dd, yyyy');
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
