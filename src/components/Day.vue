<template>
  <splitpanes class="day">
    <router-view></router-view>
    <pane v-for="i in 3" :key="i">
      <div>{{ i }}</div>
      <h1>test</h1>
    </pane>
  </splitpanes>
</template>

<script>

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'Day',
  components: {
    Splitpanes,
    Pane
  },
}
</script>

<style>
#day {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
