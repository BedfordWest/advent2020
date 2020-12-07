<template>
  <button class="card" v-on:click="goToDay(num)">
    <h1>Day {{ num }}</h1>
  </button>
</template>

<script>
export default {
  name: 'Card',
  props: {
    num: Number,
  },
  methods: {
    goToDay(num) {      
      this.$router.push({ path: `/day/${num}`});
    },
  }
}
</script>

<style>
  .card {
    height: 100px;
    width: 100px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    background-color:lightseagreen;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
