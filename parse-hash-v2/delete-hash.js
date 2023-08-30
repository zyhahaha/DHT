const axios = require('axios')
const { stringifyFn, localUrl } = require('./utils/index.js')

function deleteHashFn(hash) {
    const data = {
        hashes: hash,
        deleteFiles: true
    }
    const options = {
        url: `${localUrl}/api/v2/torrents/delete`,
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

module.exports = deleteHashFn
