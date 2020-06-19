const fs = require('fs');
const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    let markdownIt = require('markdown-it');
    let markdownLib = markdownIt({ html: true }).use(require('markdown-it-footnote'));

    eleventyConfig.setLibrary('md', markdownLib);

    // Responsive images
    let imgOptions = {
        inputDir: 'src/img',
        outputDir: 'dist/img',
    };
    eleventyConfig.addShortcode('myResponsiveImage', async function (src, alt, options=imgOptions) {
        if (alt === undefined) {
            // You bet we throw an error on missing alt (alt="" works okay)
            throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
        }

        let stats = await Image(`${imgOptions.inputDir}/${src}`, options);
        let lowestSrc = stats.jpeg[0];
        let sizes = ['800w', '1600w', '2200w']; // Make sure you customize this!

        // Iterate over formats and widths
        return `<picture>
            ${Object.values(stats).map(imageFormat => {
                return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
            }).join('\n')}
                <img
                alt="${alt}"
                src="${lowestSrc.url}"
                width="${lowestSrc.width}"
                height="${lowestSrc.height}">
            </picture>`;
    });

    // There’s gotta be a better way of handling this.
    eleventyConfig.addPassthroughCopy('src/img/trey.jpg');

    eleventyConfig.addPassthroughCopy('src/img/sprite.svg');

    eleventyConfig.addPassthroughCopy('src/keybase.txt');

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
