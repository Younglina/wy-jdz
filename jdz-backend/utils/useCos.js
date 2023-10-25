const COS = require("cos-nodejs-sdk-v5");
const fs = require('fs')
const { COS_KEY, COS_ID } = require('../config')
const COS_CONFIG = {
  SecretId: COS_ID,
  SecretKey: COS_KEY,
}
const BUCKET_CONFIG = {
  Bucket: 'younglina-1256042946',
  Region: 'ap-nanjing',
}

const uploadImage = async (info) => {
  const myCos = new COS({
    ...COS_CONFIG,
    SimpleUploadMethod: 'putObject',
  });
  info.map(item => {
    myCos.putObject({
      ...BUCKET_CONFIG,
      Key: `/wechat/${item.filename}`,
      StorageClass: "STANDARD",
      Body: Buffer.from(item.file, 'base64'), // 上传文件对象
      onProgress: function (info) {
        var percent = parseInt(info.percent * 10000) / 100;
        var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
        console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
      onFileFinish: function (err, data, options) {
        console.log(options.Key + '上传' + (err ? '失败' : '完成'));
      },
    }, function (err, data) {
      console.log(err || data);
    });
  })
}

module.exports = uploadImage