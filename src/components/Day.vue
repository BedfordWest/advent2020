<template>
  <div id="day">
    <splitpanes horizontal class="default-theme">
      <pane min-size="100">
        <splitpanes class="default-theme" vertical>
          <pane min-size="15">
            <Card class="card" :num="1" />
          </pane>          
          <pane>2</pane>
        </splitpanes>
      </pane>
      <pane min-size="20">3</pane>
    </splitpanes>
  </div>
</template>

<script>

import Card from './Card'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'Day',
  components: {
    Card,
    Splitpanes,
    Pane
  },
}
</script>

<style>
.card {
  height: 100%;
  width: 100%;
}
.splitpanes__pane {
  box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
}

html, body, #day {height: 100%; margin: 0;}
body {
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}
</style>
