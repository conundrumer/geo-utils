<template>
  <g>
    <text x="10" y="20">side: {{computed.side}}</text>
    <segment
      :x1.sync="line.x1"
      :y1.sync="line.y1"
      :x2.sync="line.x2"
      :y2.sync="line.y2"
      :bound="bound"
    >
      <path slot="point2" d='M-7,7 L7,0 L-7,-7 Z' />
    </segment>
    <point
      :x.sync="point.x"
      :y.sync="point.y"
      :bound="bound"
    >
      <circle r="6" cx="0" cy="0" />
    </point>
    <circle
      class="closest"
      :cx="computed.closestPoint.x"
      :cy="computed.closestPoint.y"
      r="3"
    />
    <circle
      class="distance-circle"
      :cx="point.x"
      :cy="point.y"
      :r="computed.distance"
    />
  </g>
</template>

<script>
import Draggable from './Draggable'
import LineSegment from './LineSegment'
import {pointLineDistance} from '../geoUtils'

export default {
  props: {
    bound: Function
  },
  data () {
    return {
      point: {
        x: 110,
        y: 110
      },
      line: {
        x1: 50,
        y1: 150,
        x2: 20,
        y2: 130
      }
    }
  },
  computed: {
    computed () {
      let {x, y} = this.point
      let {x1, y1, x2, y2} = this.line
      let out = {}
      let distance = pointLineDistance(x, y, x1, y1, x2, y2, out)
      let side = out.side == null ? null : out.side === 0 ? 'on line' : out.side > 0 ? 'left' : 'right'
      return {
        closestPoint: {
          x: out.x,
          y: out.y
        },
        side,
        distance
      }
    }
  },
  components: {
    segment: LineSegment,
    point: Draggable
  }
}
</script>

<style>
.closest {
  fill: red;
}
.distance-circle {
  fill: none;
  stroke: green;
}
</style>
