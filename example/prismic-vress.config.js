const path = require('path')
const Prismic = require('prismic-javascript')

module.exports =  {
  endpoint: `https://yourprismicio.cdn.prismic.io/api/v2`,
  dist: path.join(__dirname, 'src'),
  assetsDirName: `.vuepress/public/assets`,
  contentsDirName: '',
  mediaDownload: true,
  publishAssetsPath: '/assets/images/',
  fileTypeIndex: true,
  cleandir: false,
  query: [
    Prismic.Predicates.at('document.type', 'works'),
    {
      orderings: '[my.works.date desc]'
    }
  ]
}
