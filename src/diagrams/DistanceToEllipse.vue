<template>
  <diagram-container>
    <h1 slot="header">Distance to/Closest Point on/inside Ellipse</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <ellipse cx="0" cy="0" :rx="e.rx" :ry="e.ry" class="ellipse" />
          <line :p="closestPoint" :q="c" classes="tangent" />
          <point :c="c" :r="distance" classes="tangent" />
          <point v-if="inEllipse" :c="c" :r="14" classes="in-aabb" />
          <line :p="p" :q="{x:0,y:0}" classes="draggable-circle" />
          <ellipse cx="0" cy="0" :rx="e.rx" :ry="e.ry" class="draggable-circle" />
          <point :c="closestPoint" :r="3" classes="intersection" />
          <draggable-point :c.sync="p" :dim="dim" />
          <draggable-point :c.sync="c" :dim="dim" />
        </g>
      </svg>
    </svg-container>
    <p slot="footer">
      <span>Inside: {{inEllipse}}</span>
    </p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Point, Line} from '../shapes'
import {Point as DraggablePoint} from '../draggables'
import {objectVector} from '../geoUtils'
let {pointInsideEllipse, closestPointOnEllipse, distanceToEllipse} = objectVector

export default {
  data () {
    return {
      dim: {width: 1, height: 1},
      p: {x: 100, y: 50},
      c: {x: 0, y: 0}
    }
  },
  computed: {
    e () {
      return {
        rx: Math.abs(this.p.x) * Math.SQRT2,
        ry: Math.abs(this.p.y) * Math.SQRT2
      }
    },
    inEllipse () {
      return pointInsideEllipse(this.c, this.e)
    },
    closestPoint () {
      return closestPointOnEllipse(this.c, this.e)
    },
    distance () {
      return distanceToEllipse(this.c, this.e)
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggablePoint,
    Point,
    Line
  }
}
</script>

<style>
.ellipse {
  fill: none;
  stroke: grey;
  stroke-width: 100px;
}
</style>
