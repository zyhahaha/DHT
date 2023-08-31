const queryRemoteHashListFn = require('./query-remote-hash-list')
const queryLocalHashListFn = require('./query-local-hash-list')

const addHashFn = require('./add-hash')
const updateRemoteHashFn = require('./update-remote-hash')
const deleteHashFn = require('./delete-hash')

let allHashList = []

function runRemoteDataFn() {
    queryRemoteHashListFn(resList => {
        console.log('getRemoteHash: ', resList.length)
        let hashListStr = ''
        resList.forEach(hashItem => {
            hashListStr += `${hashItem.content}\n`
        })
        addHashFn(hashListStr)
    })
}

function runLocalDataFn() {
    queryLocalHashListFn((hashList, unhashList, allDataList) => {
        allHashList = allDataList
        console.log('getLocalHash: ', hashList.length)
        const deepRunSaveHashFn = async () => {
            if (!hashList.length) {
                return;
            };
            const hashItem = hashList.shift()
            try {
                updateRemoteHashFn(hashItem.hash, hashItem.name.replaceAll("'", '"'), hashItem.total_size || hashItem.size, 9)
                setTimeout(() => {
                    deleteHashFn(hashItem.hash)
                    deepRunSaveHashFn()
                }, 860)
            } catch (error) {
                deepRunSaveHashFn()
            }
        }
        deepRunSaveHashFn()

        const limieTime = (Date.now() / 1000 - 1200)
        unhashList = unhashList.filter(v => {
            return v.added_on < limieTime
        })
        const deepRunCheckHashFn = async () => {
            if (!unhashList.length) {
                return;
            };
            const hashItem = unhashList.shift()
            try {
                updateRemoteHashFn(hashItem.hash, '', 0, 0)
                setTimeout(() => {
                    deleteHashFn(hashItem.hash)
                    deepRunCheckHashFn()
                }, 860)
            } catch (error) {
                deepRunCheckHashFn()
            }
        }
        deepRunCheckHashFn()
    })    
}

setInterval(() => {
    try {
        if (allHashList.length < 3000) {
            runRemoteDataFn()
        }
    } catch (error) {
    }
}, 60 * 1000 * 5)
setInterval(() => {
    try {
        runLocalDataFn()
    } catch (error) {
    }
}, 60 * 1000 * 5)

runRemoteDataFn()
runLocalDataFn()
