const queryRemoteHashListFn = require('./query-remote-hash-list')
const queryLocalHashListFn = require('./query-local-hash-list')

const addHashFn = require('./add-hash')
const updateRemoteHashFn = require('./update-remote-hash')
const deleteHashFn = require('./delete-hash')

queryRemoteHashListFn(resList => {
    let hashListStr = ''
    resList.forEach(hashItem => {
        hashListStr += `${hashItem.content}\n`
    })
    addHashFn(hashListStr)
})
