const express = require('express')
const fs = require('fs')
const path = require('path');
const config = require('../config.js');
// 使用 express.Router 可以创建模块化的路由
const main = express.Router()


main.get('/list', async (request, response) => {

  let { bookId, userType } = request.session;
  let books = config.userTypeMap[userType];

  let ret = {
    "success": true,
    "code": 200,
    "message": "",
    "data": [],
  }

  const booksDir = path.resolve(__dirname, '..', 'build/books');
  var readDir = fs.readdirSync(booksDir);

  console.log('bookId', bookId);
  console.log('userType', userType);

  const datas = readDir.filter(e => books.includes(e)).map((e, index) => ({
    url: index <= bookId ? `/books/${e}/index.html` : '',
    cover: index <= bookId ? `/books/${e}/cover.jpeg` : 'logo.png',
    title: e,
    id: index
  }))

  ret.data = datas
  response.send(ret)
})


module.exports = main
