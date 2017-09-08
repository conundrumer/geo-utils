<template>
  <g>
    <slot name="line">
      <line :x1="x" :y1="y" :x2="x + dx" :y2="y + dy" />
    </slot>
    <point1
      :x.sync="x"
      :y.sync="y"
      :bound="boundOrigin"
    >
      <g :transform="rotate1">
        <slot name="point1">
          <circle r="6" cx="0" cy="0" />
        </slot>
      </g>
      <point2
        :x.sync="dx"
        :y.sync="dy"
        :bound="boundVector"
      >
        <g :transform="rotate2">
          <slot name="point2">
            <path slot="point2" d='M-7,7 L7,0 L-7,-7 Z' />
          </slot>
        </g>
      </point2>
    </point1>
  </g>
</template>

<script>
import Draggable from './Draggable'

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
  computed: {
    angle () {
      return 180 / Math.PI * Math.atan2(this.dy, this.dx)
    },
    rotate1 () {
      return `rotate(${180 + this.angle})`
    },
    rotate2 () {
      return `rotate(${this.angle})`
    }
  },
  methods: {
    boundOrigin (x, y) {
      // let {x: dx, y: dy} = this.boundVector(this.dx, this.dy)
      // this.dx = dx
      // this.dy = dy
      return this.bound(x, y)
    },
    boundVector (dx, dy) {
      let {x, y} = this.bound(this.x + dx, this.y + dy)
      return {
        x: x - this.x,
        y: y - this.y
      }
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
