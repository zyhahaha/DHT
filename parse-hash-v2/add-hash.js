const axios = require('axios')
const { stringifyFn } = require('./utils/index.js')

const data = {
    urls: '46C56E1AFB40803DAF414CB5C9F73FE9679AE745',
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
    console.log(response);
})
.catch(error => {
    // console.log(error);
})
