// const util = require('util');
// const download = require('./common/download.js');

// let _infohash = 'd2474e86c95b19b8bcfdb92bc12c9d44667cfa36';
// _infohash = _infohash.toUpperCase();
// let url = util.format('http://torrage.com/torrent/%s.torrent', _infohash);
// console.log(url)

// download(url, (err, data) => {
//     console.log(err)
//     console.log(data);
// })

const http = require('http');
const spider = new (require('./lib/spider'))
spider.on('ensureHash', (hash, addr) => {
    let content = JSON.stringify({
        hash,
        name: 'test'
    })
    let options = {
        hostname: 'localhost',
        path: '/bt/create',
        port: 8888,
        method: 'POST',
        // secureProtocol: 'SSLv3_method',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Content-Length': content.length
        }
    };
    let req = http.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            // console.log(`响应主体: ${chunk}`);
        });
    })
    req.write(content);
})
spider.listen(6339)

// const fs = require('fs');
// const torrent = require('./common/torrent.js');

// torrentData = torrent(fs.readFileSync('./assets/01.torrent'));
// console.log(torrentData);
