const axios = require('axios')
const { localUrl } = require('./utils/index.js')

const options = {
    url: `${localUrl}/api/v2/sync/maindata?rid=0&llknbbid`,
    method: 'get',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
};

function queryLocalHashListFn(nextFn) {
    const allHashList = []
    const hashList = []
    axios(options).then(response => {
        let hashMaps = response.data.torrents || {}
        for (const key in hashMaps) {
            if (Object.hasOwnProperty.call(hashMaps, key)) {
                const element = hashMaps[key];
                element.hash = key
                allHashList.push(element)
                if (element.total_size < 0 || element.size < 0) {
                } else {
                    hashList.push(element)
                }
            }
        }     
        nextFn && nextFn(hashList, allHashList)
    })
    .catch(error => {
    })    
}

module.exports = queryLocalHashListFn
