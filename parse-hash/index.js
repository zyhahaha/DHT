// https://github.com/qbittorrent/qBittorrent/wiki/WebUI-API-(qBittorrent-4.1)#add-new-torrent
const { saveHashInfoFn } = require('./save-hash-info')
const hashList = []
const { queryHashListFn } = require('./query-hash-list')
queryHashListFn(hashList, () => {
    console.log(hashList.length)
    const deepRunFn = async () => {
        if (!hashList.length) {
            return;
        };
        let hashItem = hashList.shift()
        try {
            saveHashInfoFn(hashItem.hash, hashItem.name.replaceAll("'", '"'), hashItem.total_size || hashItem.size, 9)
            setTimeout(() => {
                console.log(hashItem.hash)
                deepRunFn()
            }, 860)  
        } catch (error) {
            deepRunFn()
        }
    }
    deepRunFn()
})