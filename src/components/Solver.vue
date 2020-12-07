<template>  
  <div class="solver">
    <button class="solve" v-on:click="getSolution()">Solve</button>
    <div class="terminal">{{computedSolution}}</div>
  </div>
</template>

<script>
export default {
  name: 'Solver',
  components: {

  },
  props: {
    day: String,
    solution: String,
  },
  data:
    function () {
      return {
        displaySolution: ""
      }
  },
  computed: {
    computedSolution: function() {
      return '> ' + this.$data.displaySolution
    }
  },
  methods: {
    getSolution: function() {
      const solution = require(`../day${this.day}/solution.js`)

      this.$data.displaySolution = 'Solving, please wait...'
      setTimeout(() => { solution.default().then(response => this.$data.displaySolution = response) }, 1000);
    }
  }
}
</script>

<style>
.solver {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
}
.solve {
    height: 50px;
    width: 100px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    background-color:lightseagreen;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 1.25em;
}

.terminal{
  background-color: black;
  color: white;
  font-size: medium; 
  font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
  display: inline;
  border-style: inset;
  border-color: whitesmoke;
  width: 750px;
  margin: 0px 10px;
  padding: 10px;
}
</style>
