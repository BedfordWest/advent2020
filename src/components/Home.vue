<template>
  <button class="home" v-on:click="goHome">
    <h1>Advent Calendar</h1>
  </button>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goHome() {      
      this.$router.push({ path: `/`});
    },
  }
}
</script>

<style>
  .home {
    height: 40px;
    width: 400px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
    background-color:lightseagreen;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 500px) {
    .home h1 {
      font-size: 1em;
    }
  }
</style>
