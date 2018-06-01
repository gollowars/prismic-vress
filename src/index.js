import Prismic from 'prismic-javascript'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'
import clone from 'clone'

import Request from './Request'
import Util from './Util'
import { parse } from 'url';
import DefaultConfig from './default.config'

const debug = require('debug')('prismic-vress')

function postParser(post) {
  return post
}

class PrismicVress {
  constructor(){
    this.config = null
  }

  async generate(config, parser = postParser) {

    this.config = Object.assign(DefaultConfig, config)

    if(!this.config.endpoint) {
      throw console.error('must specify endpoint')
    }
    let postCustomParser = parser

    // cleanup
    const assetPath = path.join(this.config.dist, `/${this.config.assetsDirName}/`)
    const mediaPath = path.join(assetPath, '/images/')

    const contentsPath = path.join(this.config.dist, `/${this.config.contentsDirName}`)


    if (this.config.cleandir) {
      Util.cleanupDir(this.config.dist)
    }

    Util.mkdir(assetPath)
    Util.mkdir(contentsPath)
    let posts = await Request.getAll(this.config.endpoint,this.config.query)
    let newPostList = []

    for(const post of posts) {
      let regExp = /([\-_\.\!\~\*\'\(\)a-z0-9\;\/\?\:@&=\+\$\,\%\#]+(jpg|jpeg|gif|png|bmp))/
      let newPost = clone(post)

      // media download
      if (this.config.mediaDownload) {
        const searchTreeList = Util.deepObjectSearch(post, 'url', regExp)
        const medialist = Util.makeMedialist(post, searchTreeList)
        newPost = Util.overrideCopyPost(searchTreeList, post, `${config.publishAssetsPath}`)
        Util.mkdir(mediaPath)
        for (let url of medialist) {
          await Util.downloadMedia(url, mediaPath)
        }
      }
      const id = post.uid
      const iddir = (id) ? `/${id}` : ''
      const type = post.type
      const filedir = `${contentsPath}/${post.type}`
      debug('fileTypeIndex:', this.config.fileTypeIndex)


      const filename = (this.config.fileTypeIndex) ? `${filedir}${iddir}/index.md` : `${filedir}${iddir}.md`
      const link = (this.config.fileTypeIndex) ? `/${post.type}${iddir}/` : `/${post.type}${iddir}.html`
      newPost.link = link

      if( type ) {
        newPost.layout = type
      }


      newPost = postCustomParser(newPost)

      newPostList.push(newPost)
      const yamlStr = yaml.safeDump(newPost)
      const dumpStr = `---\n${yamlStr}---`
      let outputdir = filename.split('/')
      outputdir.length = outputdir.length - 1
      Util.mkdir(String(outputdir.join('/')))
      debug('write md:', filename)
      fs.writeFileSync(filename, dumpStr)
    }

    const allPostJson = { posts: newPostList }
    const allPostFilePath = path.join(assetPath, this.config.allPostsJsonName)
    debug('write json:', allPostFilePath)
    fs.writeFileSync(allPostFilePath, JSON.stringify(allPostJson))
  }
}
process.on('unhandledRejection', console.dir);

export default new PrismicVress()