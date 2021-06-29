const axios = require('axios');
const { DateTime } = require('luxon');
require('dotenv').config();

module.exports = async () => {
    const { data } = await axios.get(`https://api.pinboard.in/v1/posts/all?tag=tp&auth_token=${process.env.PINBOARD_AUTH}&format=json`);

    return data.sort(
        (a, b) => DateTime.fromISO(a.time, { zone: 'utc' }) - DateTime.fromISO(b.time, { zone: 'utc' })
    );
};
