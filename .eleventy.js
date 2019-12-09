const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter('markdown', value => md.renderInline(value));

    // Copy unaltered original images.
    eleventyConfig.addPassthroughCopy('src/img');

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
