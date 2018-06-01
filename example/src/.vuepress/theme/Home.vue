<template lang="pug">
  .home
    .hero
      img(v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero")
      h1 {{ data.heroText || $title || 'Hello'}}
      p.description {{ data.tagline || $description || 'Welcome to your VuePress site' }}
    .list
      .section(v-for=`(post,index) in posts`)
        router-link(:to=`post.link`)
          p.image
            img(:src=`post.data.thumbnail.url`)
          p.title {{post.title}}


    .footer(v-if="data.footer") {{ data.footer }}

</template>

<script>

import posts from '../public/assets/all.json'

export default {
  created () {
    // console.log('this.$site.themeConfig:',this.$site.themeConfig)
    console.log(this.$page)
  },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    posts() {
      return posts.posts
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

.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  .hero
    text-align center

  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
.list
  display flex

  .section
    width 49%
    margin-right 1%
    transition all .25s ease 0s
    &:hover
      opacity 0.7
    &:nth-child(2n)
      margin-right 0
      margin-left 1%

    img
      width 100%
      vertical-align top
</style>
