<template>
  <g>
    <vector
      :x.sync="x"
      :y.sync="y"
      :dx.sync="dx"
      :dy.sync="dy"
      :bound="bound"
    >
      <path slot="point2" d='M-10,7 L0,0 L-10,-7 Z' />
    </vector>
    <circle
      class="scalable-circle"
      :cx="x"
      :cy="y"
      :r="radius"
    />
  </g>
</template>

<script>
import Vector from './Vector'

export default {
  props: {
    x: {
      type: Number,
      twoWay: true
    },
    y: {
      type: Number,
      twoWay: true
    },
    dx: {
      type: Number,
      twoWay: true
    },
    dy: {
      type: Number,
      twoWay: true
    },
    bound: Function
  },
  data () {
    return {
      circle: {
        x: 110,
        y: 110,
        dx: 20,
        dy: 30
      }
    }
  },
  computed: {
    radius () {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
    }
  },
  components: {
    vector: Vector
  }
}
</script>

<style>
.scalable-circle {
  fill: none;
  stroke: blue;
}
</style>
