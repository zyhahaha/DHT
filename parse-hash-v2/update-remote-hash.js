const axios = require('axios')
// const { stringifyFn } = require('./utils/index.js')

function updateRemoteHashFn(hash, name, size, status, nextFn) {
    const data = {
        hash,
        content: encodeURIComponent(name), // decodeURIComponent
        size,
        status
    }
    const options = {
        url: 'http://119.96.189.81:8877/powerful/content',
        method: 'POST',
        data
    };
    axios(options).then(response => {
        console.log(response.data);
        nextFn && nextFn()
    })
    .catch(error => {
        // console.log(error);
    })    
}

module.exports = updateRemoteHashFn
