<template>  
  <div class="container">
    <h1>Day's Problem Description</h1>
    <div class="markdown" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Description',
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
      const file = require(`../day${this.day}/README.md`)
      return file.default
    }
  }
}
</script>

<style>
h1 {
  font-size: 1.5em;
  text-align: center;
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
