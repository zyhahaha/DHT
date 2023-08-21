exports.saveHashInfoFn = function saveHashInfoFn(hash, name, size, status) {
    const http = require('http');
    let content = JSON.stringify({
        hash,
        content: name,
        size,
        status
    })
    let options = {
        hostname: '119.96.189.81',
        path: '/powerful/content',
        port: 8877,
        method: 'POST',
        // secureProtocol: 'SSLv3_method',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Content-Length': content.length
        }
    };
    let req = http.request(options, res => {
        // res.setEncoding('utf8');
        // res.on('data', (chunk) => {
        //     // console.log(`响应主体: ${chunk}`);
        // });
    })
    req.write(content);
}