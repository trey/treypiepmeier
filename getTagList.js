// https://github.com/11ty/eleventy-base-blog/blob/ef7783222dd48ffcab1acac0ba6df5a7272948be/_11ty/getTagList.js

module.exports = function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
        if ('tags' in item.data) {
            let tags = item.data.tags;

            tags = tags.filter(function (item) {
                switch (item) {
                // this list should match the `filter` list in tags.njk
                case 'all':
                case 'nav':
                case 'post':
                case 'posts':
                case 'words':
                case 'solutions':
                    return false;
                }

                return true;
            });

            for (const tag of tags) {
                tagSet.add(tag);
            }
        }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
};
