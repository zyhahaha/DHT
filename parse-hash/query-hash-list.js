const { saveHashInfoFn } = require('./save-hash-info')
exports.queryHashListFn = function queryHashListFn() {
    const http = require('http');
    let content = JSON.stringify({
        // username: 'admin',
        // password: 'adminadmin'
        // urls: 'magnet:?xt=urn:btih:1FA823F9228AD60CA0A1D50C3000862EF3345D40',
        // torrents: ''
    })
    let options = {
        hostname: 'localhost',
        path: '/api/v2/sync/maindata?rid=0&llknbbid',
        port: 8080,
        method: 'get',
        headers: {
            Host: 'localhost:8080',
            Referer: 'http://localhost:8080/',
            Origin: 'http://localhost:8080/',
            'Content-Type': 'application/json;charset=UTF-8',
            'Content-Length': content.length,
        }
    };
    let req = http.request(options, res => {
        let chunkstr = ''
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            chunkstr += chunk
            // console.log('xxx')
            // console.log(`响应主体: ${chunk}`);
        });
        res.on('end', (res) => {
            // console.log('No more data in response.', JSON.parse(chunkstr)['torrents']);
            let hashList = JSON.parse(chunkstr)['torrents'] || {}
            let index = 300
            for (const key in hashList) {
                if (Object.hasOwnProperty.call(hashList, key)) {
                    const element = hashList[key];
                    // console.log(key)
                    setTimeout(() => {
                        saveHashInfoFn(key, element.name, element.total_size || element.size, 9)
                    }, index += 300)
                }
            }
            // console.log(hashList['26f74ab4cc7094f44808d4b6725907b607fc9139'])
        });
    })
    req.write(content);

}