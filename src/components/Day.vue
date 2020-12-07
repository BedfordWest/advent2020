<template>
  <div id="day">
    <splitpanes horizontal class="default-theme">
      <pane size="7.5">
        <splitpanes vertical class="default-theme">
          <pane size = "45">
            <Home />
          </pane>
          <pane size = "55">
            <Title :day='$route.params.id' />
          </pane>
        </splitpanes>
      </pane>
      <pane size="82.5">
        <splitpanes class="default-theme" vertical>
          <pane min-size="15">
            <Description :day='$route.params.id' />
          </pane>          
          <pane>
            <Inputs :day='$route.params.id' />
          </pane>
        </splitpanes>
      </pane>
      <pane size="10">
        <Solver :day='$route.params.id' solution='>'/>
      </pane>
    </splitpanes>
  </div>
</template>

<script>

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Description from './Description.vue'
import Home from './Home.vue'
import Inputs from './Inputs.vue'
import Solver from './Solver.vue'
import Title from './Title.vue'

export default {
  name: 'Day',
  components: {
    Splitpanes,
    Pane,
    Description,
    Home,
    Inputs,
    Solver,
    Title,
  },
}
</script>

<style>
.splitpanes.default-theme .splitpanes__pane {
  background-color: darkslategray;
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
  color: #dcf7fa;
  font-size: 1em;
}
</style>
