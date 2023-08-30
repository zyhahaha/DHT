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
    queryLocalHashListFn((hashList, allDataList) => {
        allHashList = allDataList
        console.log('getLocalHash: ', hashList.length)
        const deepRunSaveHashFn = async () => {
            if (!hashList.length) {
                return;
            };
            let hashItem = hashList.shift()
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
    })    
}

setInterval(() => {
    try {
        if (allHashList.length < 7000) {
            runRemoteDataFn()
        }
    } catch (error) {
    }
}, 60 * 1000)
setInterval(() => {
    try {
        runLocalDataFn()
    } catch (error) {
    }
}, 60 * 1000)

runRemoteDataFn()
runLocalDataFn()
