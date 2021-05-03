//node mock/swagger/getSwagger.js

const axios = require('axios').default
const fs = require('fs')
const _ = require('lodash')

let schemas
let paths

function getJson(url) {
  return axios.get(url).then((data) => {
    schemas = data.data.components.schemas
    paths = data.data.paths
    // let jsonData = JSON.stringify(data.data.components.schemas)
    // fs.writeFileSync('./mock/swagger/schemas.json', jsonData)
    // jsonData = JSON.stringify(data.data.paths)
    // fs.writeFileSync('./mock/swagger/paths.json', jsonData)
  })
}

function typeToMock(text) {
  switch (text) {
    case 'integer':
      return '@integer(0, 10)'
    case 'number':
      return '@float(60, 100000000, 1, 2)'
    case 'string':
      return '@string("lower", 3,10)'
    case 'boolean':
      return true
    case 'object':
      return {}
    default:
      return text
  }
}

function findRef(text, first = false) {
  text = text.replace('#/components/schemas/', '')
  const sc = _.find(schemas, (i, key) => key === text) //尋找對應的schemas
  let resp = {}
  if (sc) {
    _.each(sc.properties, (i, key) => {
      key = _.upperFirst(key)
      if (first && key === 'Code') {
        resp[key] = 0
      } else if (first && key === 'Message') {
        resp[key] = '@sentence(5,10)'
      } else if (i['type'] === 'array') {
        //是陣列
        resp[`${key}|1-10`] = [findRef(i['items'].$ref)]
      } else if (i['type']) {
        resp[key] = typeToMock(i['type'])
      } else {
        resp[key] = findRef(i['$ref'])
      }
    })
  }
  return resp
}

getJson('http://10.10.102.10:9091/swagger/H5/swagger.json').then(() => {
  const res = []

  _.each(paths, (i, key) => {
    const item = {}
    item.url = key
    item.type = 'post'
    item.response = {}
    _.each(i, (ii) => {
      try {
        //列出回傳資料
        const rep = ii.responses[200].content['text/json'].schema
        if (rep['type']) {
          item.response = typeToMock(rep['type'])
        } else {
          item.response = findRef(rep['$ref'], true)
        }
      } catch {
        //錯誤不抓
      }
    })
    res.push(item)
  })

  const resJson = JSON.stringify(res)
  fs.writeFileSync('./mock/swagger/res.json', resJson)
})
