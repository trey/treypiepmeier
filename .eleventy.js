const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
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

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
