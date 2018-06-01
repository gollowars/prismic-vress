const path = require('path')

module.exports =  {
  endpoint: `https://yourprismicio.cdn.prismic.io/api/v2`,
  dist: path.join(__dirname, 'src'),
  assetsDirName: `.vuepress/public/assets`,
  contentsDirName: '',
  mediaDownload: true,
  publishAssetsPath: '/assets/images/',
  fileTypeIndex: true,
  cleandir: false,
}
