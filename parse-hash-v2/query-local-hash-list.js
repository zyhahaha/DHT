const axios = require('axios')

const options = {
    url: 'http://localhost:7788/api/v2/sync/maindata?rid=0&llknbbid',
    method: 'get',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
};

function queryLocalHashListFn(nextFn) {
    axios(options).then(response => {
        // console.log(response.data);
        let hashMaps = response.data.torrents || {}
        for (const key in hashMaps) {
            if (Object.hasOwnProperty.call(hashMaps, key)) {
                const element = hashMaps[key];
                if (element.total_size < 0 || element.size < 0) {
                } else {
                    element.hash = key
                    hashList.push(element)
                }
            }
        }     
        nextFn && nextFn()
    })
    .catch(error => {
        // console.log(error);
    })    
}

module.exports = queryLocalHashListFn
