<template>
  <g>
    <line :p="c" :q="r" classes="draggable-circle"/>
    <circle :cx="c.x" :cy="c.y" :r="radius" class="draggable-circle" />
    <draggable-group :points.sync="group" :dim="dim">
      <circle :cx="c.x" :cy="c.y" r="6" />
    </draggable-group>
    <draggable-point :c.sync="r" :dim="dim" />
  </g>
</template>

<script>
import {Line} from '../shapes'
import DraggableGroup from './Group'
import DraggablePoint from './Point'
import makePointGroup from './makePointGroup'

export default {
  props: {
    c: {
      type: Object,
      twoWay: true
    },
    r: {
      type: Object,
      twoWay: true
    },
    dim: Object
  },
  computed: {
    radius () {
      let x = this.r.x - this.c.x
      let y = this.r.y - this.c.y
      return Math.sqrt(x * x + y * y)
    },
    group: makePointGroup(['c', 'r'])
  },
  components: {
    DraggableGroup,
    DraggablePoint,
    Line
  }
}
</script>

<style>
.draggable-circle {
  fill: none;
  stroke: magenta;
  stroke-width: 5px;
}
</style>
