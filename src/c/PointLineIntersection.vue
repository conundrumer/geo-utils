<template>
  <g>
    <text x="10" y="20">intersecting: {{(intersection !== null) ? intersection : 'none'}}</text>
    <segment1
      :x1.sync="line1.p_x"
      :y1.sync="line1.p_y"
      :x2.sync="line1.q_x"
      :y2.sync="line1.q_y"
      :bound="bound"
    >
      <path slot="point2" d='M-7,7 L7,0 L-7,-7 Z' />
    </segment1>
    <segment2
      :x1.sync="line2.p_x"
      :y1.sync="line2.p_y"
      :x2.sync="line2.q_x"
      :y2.sync="line2.q_y"
      :bound="bound"
    >
      <path slot="point2" d='M-7,7 L7,0 L-7,-7 Z' />
    </segment2>
    <line
      :x1="line1.p_x"
      :y1="line1.p_y"
      :x2="line2.p_x"
      :y2="line2.p_y"
    />
    <line
      class="intersection"
      v-if="lineIntersection"
      :x1="lineIntersection.p_x"
      :y1="lineIntersection.p_y"
      :x2="lineIntersection.q_x"
      :y2="lineIntersection.q_y"
    />
    <point
      :x.sync="point.x"
      :y.sync="point.y"
      :bound="bound"
    />
  </g>
</template>

<script>
import Draggable from './Draggable'
import LineSegment from './LineSegment'
import {pointLineIntersection} from '../geoUtils'

export default {
  props: {
    bound: Function
  },
  data () {
    return {
      line1: {
        p_x: 50,
        p_y: 150,
        q_x: 20,
        q_y: 130
      },
      line2: {
        p_x: 10,
        p_y: 20,
        q_x: 30,
        q_y: 40
      },
      point: {
        x: 110,
        y: 110
      }
    }
  },
  computed: {
    lineDelta () {
      let {p_x, p_y, q_x, q_y} = this.line1
      let {p_x: b_px, p_y: b_py, q_x: b_qx, q_y: b_qy} = this.line2
      return {
        dp_x: b_px - p_x,
        dp_y: b_py - p_y,
        dq_x: b_qx - q_x,
        dq_y: b_qy - q_y
      }
    },
    lineIntersection () {
      let t = this.intersection
      if (t === null) return
      let {p_x, p_y, q_x, q_y} = this.line1
      let {dp_x, dp_y, dq_x, dq_y} = this.lineDelta
      return {
        p_x: p_x + t * dp_x,
        p_y: p_y + t * dp_y,
        q_x: q_x + t * dq_x,
        q_y: q_y + t * dq_y
      }
    },
    intersection () {
      let {x, y} = this.point
      let {p_x, p_y, q_x, q_y} = this.line1
      let {dp_x, dp_y, dq_x, dq_y} = this.lineDelta
      let t = pointLineIntersection(x, y, p_x, p_y, q_x, q_y, dp_x, dp_y, dq_x, dq_y)
      return t
    }
  },
  components: {
    segment1: LineSegment,
    segment2: LineSegment,
    point: Draggable
  }
}
</script>

<style>
.intersection {
  stroke: red;
}
</style>
