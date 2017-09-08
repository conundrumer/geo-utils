<template>
  <g>
    <slot name="line">
      <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" />
    </slot>
    <point1
      :x.sync="x1"
      :y.sync="y1"
      :bound="bound"
    >
      <g :transform="rotate1">
        <slot name="point1">
          <circle r="6" cx="0" cy="0" />
        </slot>
      </g>
    </point1>
    <point2
      :x.sync="x2"
      :y.sync="y2"
      :bound="bound"
    >
      <g :transform="rotate2">
        <slot name="point2">
          <circle r="6" cx="0" cy="0" />
        </slot>
      </g>
    </point2>
  </g>
</template>

<script>
import Draggable from './Draggable'

export default {
  props: {
    x1: {
      type: Number,
      twoWay: true
    },
    y1: {
      type: Number,
      twoWay: true
    },
    x2: {
      type: Number,
      twoWay: true
    },
    y2: {
      type: Number,
      twoWay: true
    },
    bound: Function
  },
  computed: {
    angle () {
      return 180 / Math.PI * Math.atan2(this.y2 - this.y1, this.x2 - this.x1)
    },
    rotate1 () {
      return `rotate(${180 + this.angle})`
    },
    rotate2 () {
      return `rotate(${this.angle})`
    }
  },
  components: {
    point1: Draggable,
    point2: Draggable
  }
}

</script>

<style>
line {
  stroke: black;
  stroke-width: 3px;
}
</style>
