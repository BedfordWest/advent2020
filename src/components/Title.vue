<template>  
  <div class="title" v-html="compiledMarkdown"></div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Title',
  props: {
    day: String,
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.$data.markdown);
    }
  },
  data: function () {
    return {
      markdown: this.getMarkDown()
    }
  },
  methods: {
    getMarkDown: function() {      
      const file = require(`../day${this.day}/TITLE.md`)
      return file.default
    }
  }
}
</script>

<style>
.title {
  font-size: 1.5em;
  font-weight: 1000;
}
.container {
  background-color: #041e22;
  overflow: scroll;
  max-height: 100%;
  height: 100%;
}
.markdown {
  padding: 5px 20px;
}
</style>
