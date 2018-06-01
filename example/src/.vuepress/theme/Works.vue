<template lang="pug">
  .home
    .hero
      h1 {{ $title }}
    .contents
      p.desc-ja {{ this.contents['text-ja'][0].text }}
      p.desc-en {{ this.contents['text-en'][0].text }}
      p.year {{ this.contents['year'][0].text }}
      p.media {{ this.contents['media'][0].text }}
      p.role {{ this.contents['role'][0].text }}
      p.url
        a(:href=`this.contents['url'].url`) url
      p.date {{ this.contents['date'] }}
      p.topimage
        img(:src=`this.contents.topimage.url`)
      div(v-for=`(url,index) in images`)
        p.image(v-if=`url`)
        img(:src=`url`)

</template>

<script>

export default {
  created () {
    const item = this.contents.body[0]
    console.log(item.primary.image.url)
    // console.log('this.$site.themeConfig:',this.$site.themeConfig)
    console.log(this.$page)
  },
  computed: {
    images () {
      return this.contents.body.map((item,index)=>{
        console.log('item:',item.primary.image)
        return (item.primary.image)? item.primary.image.url :
          (item.primary.leftimage) ? item.primary.leftimage.url :
            (item.primary.rightimage) ? item.primary.rightimage.url : null
      })
    },
    data () {
      return this.$page.frontmatter
    },
    contents () {
      return this.$page.frontmatter.data
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

img
  max-width 100%

</style>
