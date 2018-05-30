import Prismic from 'prismic-javascript'
import Request from './Request'
import Util from './Util'
import fs from 'fs-extra'
import yaml from 'js-yaml'

const debug = require('debug')('vpress')


class PrismicVress {
  constructor(){
    this.config = null
  }

  async generate(config) {
    this.config = config

    // cleanup
    Util.cleanupDir(this.config.dist)
    Util.mkdir(this.config.assets)
    Util.mkdir(this.config.contents)
    let posts = await Request.getAll(config.endpoint)

    for(const post of posts) {
      let regExp = /([\-_\.\!\~\*\'\(\)a-z0-9\;\/\?\:@&=\+\$\,\%\#]+(jpg|jpeg|gif|png|bmp))/
      const searchTreeList = Util.deepObjectSearch(post, 'url', regExp)
      const medialist = Util.makeMedialist(post, searchTreeList)
      let newPost = Util.overrideCopyPost(searchTreeList, post, `${config.publishAssetsDir}`)

      // media download
      // for (let url of medialist) {
      //   await Util.downloadMedia(url, config.assets)
      // }
      const id = post.uid
      const type = post.type
      const yamlStr = yaml.safeDump(newPost)
      const filedir = `${config.contents}/${post.type}`
      Util.mkdir( filedir )
      if (config.fileTypeIndex) {
        Util.mkdir(`${filedir}/${id}`)
      }
      const filename = (config.fileTypeIndex) ? `${filedir}/${id}/index.md` : `${filedir}/${id}.md`
      // fs.writeFileSync()
      const dumpStr = `---\n${yamlStr}\n---`
      // debug('post:',post)
      fs.writeFileSync(filename, dumpStr)
    }

    debug('done!!!')
  }
}
process.on('unhandledRejection', console.dir);

export default new PrismicVress()