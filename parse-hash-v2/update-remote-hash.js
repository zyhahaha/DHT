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
        console.log('更新HASH成功: ', hash);
        nextFn && nextFn()
    })
    .catch(error => {
    })    
}

module.exports = updateRemoteHashFn
