<template>
  <g>
    <text x="10" y="20">intersecting: {{!!intersection}}</text>
    <segment
      :x1.sync="line.x1"
      :y1.sync="line.y1"
      :x2.sync="line.x2"
      :y2.sync="line.y2"
      :bound="bound"
    >
      <path slot="point2" d='M-7,7 L7,0 L-7,-7 Z' />
    </segment>
    <scalable-circle
      :x.sync="circle.x"
      :y.sync="circle.y"
      :dx.sync="circle.dx"
      :dy.sync="circle.dy"
      :bound="bound"
    />
    <circle
      v-if="intersection"
      class="intersection"
      :cx="intersection.x"
      :cy="intersection.y"
      r="4"
    />
  </g>
</template>

<script>
import ScalableCircle from './ScalableCircle'
import LineSegment from './LineSegment'
import {circleLineIntersection} from '../geoUtils'

export default {
  props: {
    bound: Function
  },
  data () {
    return {
      line: {
        x1: 50,
        y1: 150,
        x2: 10,
        y2: 15
      },
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
      let {dx, dy} = this.circle
      return Math.sqrt(dx * dx + dy * dy)
    },
    intersection () {
      let r = this.radius
      let {x: cx, y: cy} = this.circle
      let {x1, y1, x2, y2} = this.line
      let out = {}
      let t = circleLineIntersection(r, cx, cy, x1, y1, x2, y2, out)
      return (t !== null) ? out : null
    }
  },
  components: {
    segment: LineSegment,
    ScalableCircle
  }
}
</script>

<style>
.intersection {
  fill: red;
}
</style>
