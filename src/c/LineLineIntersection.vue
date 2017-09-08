<template>
  <g>
    <text x="10" y="20">intersecting: {{intersection && true}}</text>
    <segment1
      :x1.sync="line1.x1"
      :y1.sync="line1.y1"
      :x2.sync="line1.x2"
      :y2.sync="line1.y2"
      :bound="bound"
    />
    <segment2
      :x1.sync="line2.x1"
      :y1.sync="line2.y1"
      :x2.sync="line2.x2"
      :y2.sync="line2.y2"
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
import LineSegment from './LineSegment'
import {lineLineIntersection} from '../geoUtils'

export default {
  props: {
    bound: Function
  },
  data () {
    return {
      line1: {
        x1: 50,
        y1: 150,
        x2: 20,
        y2: 130
      },
      line2: {
        x1: 50,
        y1: 50,
        x2: 120,
        y2: 130
      }
    }
  },
  computed: {
    intersection () {
      let {x1: a_px, y1: a_py, x2: a_qx, y2: a_qy} = this.line1
      let {x1: b_px, y1: b_py, x2: b_qx, y2: b_qy} = this.line2
      return lineLineIntersection(a_px, a_py, a_qx, a_qy, b_px, b_py, b_qx, b_qy, {})
    }
  },
  components: {
    segment1: LineSegment,
    segment2: LineSegment
  }
}
</script>

<style>
.intersection {
  fill: red;
}
</style>
