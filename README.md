# PrismicVress
PrismicVress is mdfile,media generator from prismicioAPI for vuepress

## example

```js
import path from 'path'
import PrismicVress from 'prismic-vress'

const Config = {
  endpoint: `https://YOUR_PRISMIC_DOMAIN.cdn.prismic.io/api/v2`,
  dist: path.join(__dirname, 'src'),
  assetsDirName: `.vuepress/public/assets`,
  contentsDirName: '',
  mediaDownload: true,
  publishAssetsPath: '/assets/images/',
  fileTypeIndex: true,
  cleandir: false,
}

// generate markdown file and download images
// return promise
PrismicVress.generate(Config,function (post){
  // custom frontmatter
  let newPost = post
  newPost.pageClass = `${newPost.layout}-class`
  newPost.lang = 'ja'
  return newPost
})
```
