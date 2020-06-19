const Image = require('@11ty/eleventy-img');

module.exports = async (src, alt) => {
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

    // Iterate over formats (just jpeg for now) and widths.
    return Object.values(stats).map(imageFormat => {
        return `<img
                    alt="${alt}"
                    src="${lowestSrc.url}"
                    srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`)}" />`;
    });
};
