import Prismic from 'prismic-javascript'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'
import clone from 'clone'

import Request from './Request'
import Util from './Util'
import { parse } from 'url';
import DefaultConfig from './default.config'

const chalk = require('chalk')

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
      const link = (this.config.fileTypeIndex) ? `/${type}${iddir}/` : `/${type}${iddir}.html`

      // add link
      newPost.link = link

      newPostList.push(newPost)
    }

    // write markdown
    newPostList.forEach((post,index)=>{
      const id = post.uid
      const iddir = (id) ? `/${id}` : ''
      const type = post.type
      if (type) {
        post.layout = type
      }
      const filedir = `${contentsPath}/${type}`
      const filename = (this.config.fileTypeIndex) ? `${filedir}${iddir}/index.md` : `${filedir}${iddir}.md`

      // custom
      post = postCustomParser(post, index, newPostList)

      const yamlStr = yaml.safeDump(post)
      const dumpStr = `---\n${yamlStr}---`
      let outputdir = filename.split('/')
      outputdir.length = outputdir.length - 1
      Util.mkdir(String(outputdir.join('/')))
      console.log(`${chalk.blue(`Write a markdown file`)}`, filename)
      fs.writeFileSync(filename, dumpStr)
    })



    const allPostJson = { posts: newPostList }
    const allPostFilePath = path.join(assetPath, this.config.allPostsJsonName)
    console.log(`${chalk.blue(`Write All json`)}`, allPostFilePath)
    fs.writeFileSync(allPostFilePath, JSON.stringify(allPostJson))
  }
}
// process.on('unhandledRejection', console.dir);

export default new PrismicVress()
