const fetch = require('node-fetch');
require('dotenv').config();

module.exports = async function() {
    return await fetch(`https://api.pinboard.in/v1/posts/all?tag=tp&auth_token=${process.env.PINBOARD_AUTH}&format=json`)
        .then(res => res.json())
        .then(json => json.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()));
};
