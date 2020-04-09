'use strict';

let path = require('path'),
    _ = require('lodash'),
    bencode = require('bencode');

let getFileListAndSize, getFileType;

module.exports = function (torrentData) {
    let data = bencode.decode(torrentData),
        dataInfo = data.info;

    torrentData = null;

    // 种子只有一个文件的时候，可能不存在files字段，
    if (dataInfo.files) {
        let fileListAndSize = getFileListAndSize(dataInfo.files);
        return {
            // 种子文件名
            name: (dataInfo['name.utf-8'] || dataInfo['name']).toString(),
            // 主文件类型
            type: getFileType(dataInfo.files),
            // 包含的文件列表
            fileList: fileListAndSize.list,
            // 总大小
            size: fileListAndSize.size
        };
    } else {
        let name = (dataInfo['name.utf-8'] || dataInfo['name']).toString(),
            _split = name.split('.'),
            type = _split.length <= 0 ? '' : _split[_split.length - 1];

        return {
            name,
            type,
            fileList: {
                name,
                size: dataInfo.length
            },
            size: dataInfo.length
        };
    }
};

// 格式化文件列表
getFileListAndSize = function (list) {
    let result = [],
        size = 0;

    list.map(function (currentValue) {
        let names = currentValue['path.utf-8'] || currentValue['path'],
            item = {
                size: currentValue.length, // 文件大小
                name: names[names.length - 1].toString() // 文件名
            };

        result.unshift(item);

        size += currentValue.length;
    });

    return {
        list: result,
        size: size
    };
};

// 获取主文件类型
getFileType = function (list) {
    if (!list || list.length <= 0) {
        return '';
    }

    let mainFile = _.max(list, 'length'),
        mainFileName = mainFile['path.utf-8'] || mainFile['path'],
        _split = mainFileName[mainFileName.length - 1].toString().split('.');

    return _split.length <= 0 ? '' : _split[_split.length - 1];
};