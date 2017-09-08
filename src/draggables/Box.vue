<template>
  <g>
    <draggable-group :points.sync="group" :dim="dim">
      <path class="draggable-line" :d="path"/>
    </draggable-group>
    <draggable-point :c.sync="p" :dim="dim"/>
    <draggable-point :c.sync="q" :dim="dim"/>
  </g>
</template>

<script>
import DraggablePoint from './Point'
import DraggableGroup from './Group'
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
    group: makePointGroup(['p', 'q']),
    x1 () {
      return Math.min(this.p.x, this.q.x)
    },
    x2 () {
      return Math.max(this.p.x, this.q.x)
    },
    y1 () {
      return Math.min(this.p.y, this.q.y)
    },
    y2 () {
      return Math.max(this.p.y, this.q.y)
    },
    path () {
      return ['M', this.x1, this.y1, 'H', this.x2, 'V', this.y2, 'H', this.x1, 'Z'].join(' ')
    }
  },
  components: {
    DraggablePoint,
    DraggableGroup
  }
}
</script>
