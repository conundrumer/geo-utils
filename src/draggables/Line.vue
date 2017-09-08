<template>
  <g>
    <draggable-group :points.sync="group" :dim="dim">
      <line classes="draggable-line" :p="p" :q="q"/>
    </draggable-group>
    <draggable-point :c.sync="p" :dim="dim"/>
    <draggable-point :c.sync="q" :dim="dim"/>
  </g>
</template>

<script>
import DraggablePoint from './Point'
import DraggableGroup from './Group'
import {Line} from '../shapes'
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
    group: makePointGroup(['p', 'q'])
  },
  components: {
    DraggablePoint,
    DraggableGroup,
    Line
  }
}
</script>
