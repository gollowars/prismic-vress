# PrismicVress
PrismicVress is mdfile,media generator from prismicioAPI for vuepress

## ease to use
```js
import PrismicVress from 'prismic-vress'
PrismicVress.generate({
  endpoint: `https://YOUR_PRISMIC_DOMAIN.cdn.prismic.io/api/v2`,
  dist: 'docs'
})
```

### check publish dir
```
docs
├── assets
└── contents
```

## Custom

```js
import path from 'path'
import PrismicVress from 'prismic-vress'
const Prismic = require('prismic-javascript')

const Config = {
  endpoint: `https://YOUR_PRISMIC_DOMAIN.cdn.prismic.io/api/v2`,
  dist: path.join(__dirname, 'src'),
  assetsDirName: `.vuepress/public/assets`,// download folder name under dist
  contentsDirName: 'assets_images', // markdown file folder name under dist
  mediaDownload: true, // if false not downaload media like image
  publishAssetsPath: '/assets/images/', // override image path of json published all post
  fileTypeIndex: true, // if false write [postname].md else /postname/index.md
  cleandir: false, // if true ,remove dir on every generate
  query: [ //  check : https://prismic.io/docs/javascript/query-the-api/how-to-query-the-api
    Prismic.Predicates.at('document.type', 'works'),
    {
      orderings: '[my.works.date desc]'
    }
  ]
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
