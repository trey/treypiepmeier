const axios = require('axios');
require('dotenv').config();

module.exports = async () => {
    const { data } = await axios.get(`https://api.pinboard.in/v1/posts/all?tag=tp&auth_token=${process.env.PINBOARD_AUTH}&format=json`);
    const sortedData = data.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));

    return sortedData;
};
