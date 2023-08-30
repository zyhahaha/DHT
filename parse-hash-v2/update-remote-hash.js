const axios = require('axios')
const { remoteUrl } = require('./utils/index.js')

function updateRemoteHashFn(hash, name, size, status, nextFn) {
    const data = {
        hash,
        content: encodeURIComponent(name), // decodeURIComponent
        size,
        status
    }
    const options = {
        url: `${remoteUrl}/powerful/content`,
        method: 'POST',
        data
    };
    axios(options).then(response => {
        // console.log(response.data);
        nextFn && nextFn()
    })
    .catch(error => {
        // console.log(error);
    })    
}

module.exports = updateRemoteHashFn
