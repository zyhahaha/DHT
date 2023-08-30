const axios = require('axios')
const { remoteUrl } = require('./utils/index.js')

let pageIndex = 1

function queryRemoteHashListFn(nextFn) {
    pageIndex += 2
    const options = {
        url: `${remoteUrl}/powerful/list`,
        method: 'POST',
        data: { pageIndex, pageSize: 300, hot_count: 9 }
    };
    axios(options).then(response => {
        nextFn && nextFn(response.data.data.list)

        if (pageIndex > 100) pageIndex = 1
        if (!response.data.data.list.length) pageIndex = 1
    })
    .catch(error => {
    })    
}

module.exports = queryRemoteHashListFn
