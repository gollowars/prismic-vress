import fs from 'fs-extra'
import clone from 'clone'
import axios from 'axios'

const debug = require('debug')('prismic-vress')

function makeKeyFromTree(searchTreeList) {
  return searchTreeList.map((obj, index) => {
    let treekeyStr = ''
    obj.place.split('/').forEach((key) => {
      treekeyStr = treekeyStr + `['${key}']`
    })
    return treekeyStr
  })
}


export default class Util {
  static async cleanupDir(dir) {
    fs.removeSync(dir)
    const exist = fs.pathExistsSync(dir)
    if (!exist) {
      fs.mkdirsSync(dir)
    }
  }

  static async mkdir(dir) {
    const exist = fs.pathExistsSync(dir)
    if (!exist) {
      fs.mkdirsSync(dir)
    }
  }

  static deepObjectSearch(object, searchKey, valRegExp) {
    let treeList = []

    objectSearch(object,searchKey,treeList, '')
    function objectSearch(object, searchKey, treeList, tree) {
      Object.keys(object).forEach((key, index) => {
        const value = object[key]
        const place = String(tree + key)
        if (typeof (value) === 'object') {
          if (!value) return

          objectSearch(value, searchKey, treeList, place + '/')
        } else {
          if (key === searchKey && value.match(valRegExp)) {
            treeList.push({
              place: place,
              value: value
            })
          }
        }
      })
      return treeList
    }

    return treeList
  }

  static makeMedialist(post, searchTreeList) {
    return makeKeyFromTree(searchTreeList)
    .map((key, index) => {
      return eval(`post${key}`)
    })
  }

  static overrideCopyPost(searchTreeList, object, publishPath) {
    let copy = clone(object)
    makeKeyFromTree(searchTreeList)
    .forEach((key, index) => {
      const value = eval(`object${key}`)
      const dirs = value.split('/')
      const filename = dirs[dirs.length - 1]
      const newvalue = publishPath + filename
      eval(`copy${key} = '${newvalue}'`)
    })
    return copy
  }

  static async downloadMedia(url, publishpath) {
    return new Promise(async (resolve,reject)=>{
      const dirs = url.split('/')
      const filename = dirs[dirs.length - 1]
      const output = `${publishpath}/${filename}`
      const exitFlag = fs.pathExistsSync(output)
      if (exitFlag) {
        debug('exited file, skip download: ', url)
        resolve()
      }else {
        try {
          debug('downloading...: ', url)
          const res = await axios.get(url, {
            responseType: 'arraybuffer'
          })
          fs.writeFileSync(output, new Buffer(res.data), 'binary');
          resolve()
        } catch (e) {
          debug('error url:', url)
          reject(e)
        }
      }
    })
  }


}
