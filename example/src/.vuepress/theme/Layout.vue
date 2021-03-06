<template lang='pug'>
  .theme-container(:class="pageClasses")
    .header
      router-link(to=`/`)
        h1 Home
    .custom-layout(v-if="$page.frontmatter.layout")
      component(:is="$page.frontmatter.layout")
    Home(v-else-if="$page.frontmatter.home")
    Page(v-else)
</template>

<script>
import "babel-polyfill"
import Vue from 'vue'
import nprogress from 'nprogress'
import Home from './Home.vue'
import Page from './Page.vue'
import works from './Works'
import Profile from './Profile'
import { pathToComponentName } from '@app/util'
import { resolveSidebarItems } from './util'

export default {
  components: { Home, Page, works, Profile },
  data () {
    return {
    }
  },

  computed: {
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        userPageClass
      ]
    }
  },

  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },

  mounted () {
    // update title / meta tags
    this.currentMetaTags = []
    const updateMeta = () => {
      document.title = this.$title
      document.documentElement.lang = this.$lang
      const meta = [
        {
          name: 'description',
          content: this.$description
        },
        ...(this.$page.frontmatter.meta || [])
      ]
      this.currentMetaTags = updateMetaTags(meta, this.currentMetaTags)
    }
    this.$watch('$page', updateMeta)
    updateMeta()

    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(pathToComponentName(to.path))) {
        nprogress.start()
      }
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
    })
  },

  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  },

  methods: {
  }
}

function updateMetaTags (meta, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}
</script>

<style src="./styles/theme.styl" lang="stylus"></style>
<style lang="stylus" scoped>
.header,h1
  margin 0
  font-size 1.5rem
.header
  position fixed
  top 0
  left 0
  width 100%
  padding 10px 10px

</style>
