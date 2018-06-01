const PrismicVress = require('prismic-vress').default
const Config = require('./prismic-vress.config')


PrismicVress.generate(Config,function (post){
  let newPost = post
  if (newPost.data.title) {
    newPost.title = newPost.data.title[0].text
  }
  newPost.pageClass = `${newPost.layout}-class`
  newPost.lang = 'ja'
  return newPost
})
