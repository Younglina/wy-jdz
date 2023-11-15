const Router = require('koa-router');
const router = new Router();
const uploadFiles = require('../utils/useCos')
const jwtMiddleware = require('../middleware/jwt');
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

const { exec } = require('child_process');

const multer = require('@koa/multer')
const upload = multer();

router.post('/web/upload', jwtMiddleware, upload.single('file'), async (ctx) => {
  const creater = ctx.state.user
  if (creater.rid != 1) {
    ctx.body = { code: 401, message: '没有权限' };
  }
  const params = ctx.request.body
  if (params.filename) {
    const res = await uploadFiles([{ file: ctx.file.buffer, filename: params.filename }], 'blog')
    console.log(res, 'asdfasdf')
    ctx.body = {
      "code": 200,
      "data": res.map(item => {
        return { url: item.url, filename: item.filename }
      })
    }
  }
})

router.post('/web/blog', jwtMiddleware, async (ctx) => {
  const creater = ctx.state.user
  if (creater.rid != 1) {
    ctx.body = { code: 401, message: '没有权限' };
  }
  const params = ctx.request.body
  if (params.text && params.content && params.link) {
    const dates = dayjs(new Date).format('YYYY-MM-DD')
    const fileName = `${params.link}.md`
    const toFilePath = path.resolve(__dirname, '../../../Woung/docs/blog');
    const filePath = path.join(toFilePath, fileName)
    console.log(filePath)
    let msg = ''
    let markdown = `---
title: ${params.text}
author: Younglina
date:  ${dates}
categories:
- 文档
tags:
- 记录
---
${params.content}
`
    fs.writeFile(filePath, markdown, 'utf-8', (err) => {
      if (err) {
        ctx.body = {
          "code": 200,
          "message": msg
        }
      }

      const sidebarPath = path.resolve(__dirname, '../../../Woung/docs/.vitepress/sidebar.json');
      // 读取文件内容
      fs.readFile(sidebarPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        // 打印文件内容
        const sidebar = JSON.parse(data)
        const blogs = sidebar['/blog/'].items[0].items
        blogs.push({ text: params.text, link: params.link })
        fs.writeFile(sidebarPath, JSON.stringify(sidebar), 'utf-8', (err) => {
          if (err) {
            console.error(err)
          }
        })
      });

      // const buildPath = path.resolve(__dirname, '../../../Woung');
      // const command = `cd ${buildPath} && npm run build`;

      // exec(command, (error, stdout, stderr) => {
      //   if (error) {
      //     console.error('Error executing command:', error);
      //     return;
      //   }

      //   console.log('Command executed successfully:', stdout);
      // });
    })
      ctx.body = {
        "code": 200,
        "message": '保存成功'
      }
  } else {
    ctx.body = {
      "code": 200,
      "message": '标题名称不能为空'
    }
  }
})

module.exports = router