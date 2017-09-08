<template>
  <g>
    <draggable-group :points.sync="group" :dim="dim">
      <line classes="draggable-line" :p="p" :q="q"/>
    </draggable-group>
    <draggable-point :c.sync="p" :dim="dim"/>
    <draggable-point :c.sync="q" :dim="dim">
      <arrow :angle="angle" />
    </draggable-point>
  </g>
</template>

<script>
import DraggablePoint from './Point'
import DraggableGroup from './Group'
import {Line, Arrow} from '../shapes'
import makePointGroup from './makePointGroup'

export default {
  props: {
    p: {
      type: Object,
      twoWay: true
    },
    q: {
      type: Object,
      twoWay: true
    },
    dim: Object
  },
  computed: {
    angle () {
      let dx = this.q.x - this.p.x
      let dy = this.q.y - this.p.y
      return 180 / Math.PI * Math.atan2(dy, dx)
    },
    group: makePointGroup(['p', 'q'])
  },
  components: {
    DraggablePoint,
    DraggableGroup,
    Line,
    Arrow
  }
}
</script>
