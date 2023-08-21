exports.queryHashInfoFn = function queryHashInfoFn(hash) {
    const http = require('http');
    let content = JSON.stringify({})
    let options = {
        hostname: 'localhost',
        path: `/api/v2/torrents/properties?hash=${hash}&llg7dok6`,
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
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log('xxx')
            console.log(`响应主体: ${chunk}`);
        });
        res.on('end', (res) => {
            // console.log('No more data in response.', res);
        });
    })
    req.write(content);

}