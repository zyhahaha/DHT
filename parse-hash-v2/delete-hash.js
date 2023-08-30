const axios = require('axios')
const { stringifyFn } = require('./utils/index.js')

function deleteHashFn() {
    const data = {
        hashes: '46c56e1afb40803daf414cb5c9f73fe9679ae745',
        deleteFiles: true
    }
    const options = {
        url: 'http://localhost:7788/api/v2/torrents/delete',
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: stringifyFn(data)
    };
    axios(options).then(response => {
        console.log(response);
    })
    .catch(error => {
        // console.log(error);
    })
}

module.exports = deleteHashFn
