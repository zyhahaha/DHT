exports.queryHashListFn = function queryHashListFn(hashList, callFn) {
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
            let hashMaps = JSON.parse(chunkstr)['torrents'] || {}
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
            callFn && callFn()
        });
    })
    req.write(content);
}
