const axios = require('axios')

const options = {
    url: 'http://119.96.189.81:8877/powerful/list',
    method: 'POST'
};

function queryRemoteHashListFn(nextFn) {
    axios(options).then(response => {
        console.log(response.data);
        nextFn && nextFn()
    })
    .catch(error => {
        // console.log(error);
    })    
}

module.exports = queryRemoteHashListFn
