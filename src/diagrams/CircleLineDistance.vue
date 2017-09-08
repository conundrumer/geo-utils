<template>
  <diagram-container>
    <h1 slot="header">Closest Point on / Distance to Line Segment</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <line :p="closestPoint" :q="c" classes="tangent" />
          <point :c="c" :r="distance" classes="tangent" />
          <draggable-line :p.sync="line.p" :q.sync="line.q" :dim="dim" />
          <point :c="closestPoint" :r="3" classes="intersection" />
          <draggable-point :c.sync="c" :dim="dim" />
        </g>
      </svg>
    </svg-container>
    <p slot="footer">
      <span>Distance: {{roundedDistance}}</span>
      <span v-if="sideOfLine">; Side: {{sideOfLine}}</span>
    </p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Point, Line} from '../shapes'
import {Point as DraggablePoint, Line as DraggableLine} from '../draggables'
import {objectVector} from '../geoUtils'
let {closestPointOnLine, distanceToLine, signedDistanceToLine} = objectVector

export default {
  data () {
    return {
      dim: {width: 1, height: 1},
      line: {
        p: {x: -10, y: -10},
        q: {x: 10, y: 10}
      },
      c: {x: 0, y: 0}
    }
  },
  computed: {
    closestPoint () {
      return closestPointOnLine(this.c, this.line)
    },
    distance () {
      return distanceToLine(this.c, this.line)
    },
    roundedDistance () {
      var D = 1000
      return Math.round(this.distance * D) / D
    },
    sideOfLine () {
      let p = this.closestPoint
      if (p === this.line.p || p === this.line.q) {
        return
      }
      let d = signedDistanceToLine(this.c, this.line)
      return (d > 0) ? 'left' : (d < 0) ? 'right' : 'collinear'
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggablePoint,
    DraggableLine,
    Point,
    Line
  }
}
</script>

<style>
.tangent {
  fill: none;
  stroke: orange;
  stroke-width: 2px;
}
</style>
