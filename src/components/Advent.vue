<template>
  <div id="advent">
    <waterfall :line-gap="120" :watch="items">
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="index + 1"
      >
        <Card :num="index + 1" />
      </waterfall-slot>
    </waterfall>
  </div>
</template>

<script>

import Card from './Card'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

export default {
  name: 'Advent',
  components: {
    Card,
    Waterfall,
    WaterfallSlot
  },
  data: function () {
    return {
      items: [
        { height: 100,
          width: 100
        },
        { height: 100,
          width: 100
        }
      ]
    }
  }
}
</script>

<style>
body {
  background-color: darkslategray
}
#advent {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px 30px;
}
</style>
