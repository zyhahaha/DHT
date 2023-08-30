const axios = require('axios')
const { remoteUrl } = require('./utils/index.js')

const options = {
    url: `${remoteUrl}/powerful/list`,
    method: 'POST',
    data: { pageSize: 100 }
};

function queryRemoteHashListFn(nextFn) {
    axios(options).then(response => {
        nextFn && nextFn(response.data.data.list)
    })
    .catch(error => {
    })    
}

module.exports = queryRemoteHashListFn
