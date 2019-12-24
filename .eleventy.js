const fs = require('fs');
const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const Jimp = require('jimp');
const fg = require('fast-glob');
const wordsImagesPath = 'img/words';
const wordsImages = fg.sync([`src/${wordsImagesPath}/*`], { objectMode: true });

// Generate different sized image files.
for (let image of wordsImages) {
    const regex = /\.[^/.]+$/;
    const fileName = image.name.replace(regex, '');
    const fileExtension = image.name.match(regex).pop();
    const fileVersion = size => `${wordsImagesPath}/${fileName}-${size}${fileExtension}`;

    if (!fs.existsSync(`dist/${fileVersion('large')}`)) {
        Jimp.read(image.path, (err, img) => {
            if (err) throw err;
            img.resize(2200, Jimp.AUTO).quality(60).write(`dist/${fileVersion('large')}`);
        });
    }
    if (!fs.existsSync(`dist/${fileVersion('medium')}`)) {
        Jimp.read(image.path, (err, img) => {
            if (err) throw err;
            img.resize(1600, Jimp.AUTO).quality(60).write(`dist/${fileVersion('medium')}`);
        });
    }
    if (!fs.existsSync(`dist/${fileVersion('small')}`)) {
        Jimp.read(image.path, (err, img) => {
            if (err) throw err;
            img.resize(800, Jimp.AUTO).quality(60).write(`dist/${fileVersion('small')}`);
        });
    }
    if (!fs.existsSync(`dist/${fileVersion('original')}`)) {
        // Optimize original image
        Jimp.read(image.path, (err, img) => {
            if (err) throw err;
            img.quality(60).write(`dist/${fileVersion('original')}`);
        });
    }
}

module.exports = function(eleventyConfig) {
    let markdownIt = require('markdown-it');
    let markdownLib = markdownIt({ html: true }).use(require('markdown-it-footnote'));

    eleventyConfig.setLibrary('md', markdownLib);

    // There’s gotta be a better way of handling this.
    eleventyConfig.addPassthroughCopy('src/img/trey.jpg');

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
