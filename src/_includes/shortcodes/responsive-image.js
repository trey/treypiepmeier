const Image = require('@11ty/eleventy-img');

module.exports = async (src, alt, title) => {
    if (alt === undefined) {
        throw new Error(`Missing alt on responsiveImage from: ${src}`);
    }
    const options = {
        inputDir: 'src/img',
        outputDir: 'dist/img',
        widths: [800, 1600, 2200],
        formats: 'jpeg',
    };

    let stats = await Image(`${options.inputDir}/${src}`, options);
    let lowestSrc = stats.jpeg[0];
    let titleAttribute = (title) ? `title="${title}"` : '';
    let props = stats[options.formats].pop();

    // Iterate over formats (just jpeg for now) and widths.
    return Object.values(stats).map(imageFormat => {
        return `<img
                    alt="${alt}" ${titleAttribute}
                    src="${lowestSrc.url}"
                    width="${props.width}"
                    height="${props.height}"
                    srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`)}" />`;
    });
};
