<template>  
  <div class="container">
    <h1>Inputs</h1>
    <pre>
      <div class="inputs" v-html="compiledJson"></div>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'Inputs',
  props: {
    day: String,
  },
  computed: {
    compiledJson: function () {
      return this.$data.json.inputs;
    }
  },
  data: function () {
    return {
      json: this.getInputs()
    }
  },
  methods: {
    getInputs: function() {
      const file = require(`../day${this.day}/INPUTS.json`)
      return file
    }
  }
}
</script>

<style>
h1 {
  text-align: center;
}
.container {
  background-color: #041e22;
  overflow: scroll;
  max-height: 100%;
  height: 100%;
  width: 100%;
}
.inputs {
  padding: 5px 20px;
}
</style>
