import path from 'path'

export default {
  dist: path.join(__dirname, 'dist'),
  assetsDirName: `assets`,
  contentsDirName: 'contents',
  mediaDownload: true,
  publishAssetsPath: '/assets/images/',
  fileTypeIndex: true,
  cleandir: false,
  allPostsJsonName: 'all.json',
  query: ''
}
