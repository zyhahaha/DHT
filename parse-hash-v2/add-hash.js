const axios = require('axios')
const { stringifyFn } = require('./utils/index.js')

function addHashFn(hash) {
    const data = {
        urls: hash,
        stopCondition: 'MetadataReceived',
        contentLayout: 'Original'
    }
    const options = {
        url: 'http://localhost:7788/api/v2/torrents/add',
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: stringifyFn(data)
    };
    axios(options).then(response => {
        // console.log(response);
    })
    .catch(error => {
        // console.log(error);
    })
}

module.exports = addHashFn

