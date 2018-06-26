# PrismicVress
PrismicVress is a assets generator that fetch API for vuepress

## ease to use
```js
yarn global add prismic-vress
prismic-vress generate --endpoint https://YOUR_PRISMIC_DOMAIN.cdn.prismic.io/api/v2
```

### check publish dir
```
docs
├── assets
└── contents
```

## Script

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
PrismicVress.generate(Config,function (post, index, list){
  // custom frontmatter
  let newPost = post
  newPost.pageClass = `${newPost.layout}-class`
  newPost.lang = 'ja'
  return newPost
})
```
