<template>
  <diagram-container>
    <h1 slot="header">Point Inside 4-point Convex Hull</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <point v-if="inAABB" :c="c" :r="14" classes="in-aabb" />
          <point v-if="inHull" :c="c" :r="10" classes="in-hull" />
          <rect :x="aabb.left" :y="aabb.top" :width="aabb.width" :height="aabb.height" class="tangent" />
          <g v-for="line in lines">
            <line :p="line.p" :q="line.q" classes="light-line" />
          </g>
          <draggable-point v-for="p in points" :c.sync="p" :dim="dim" />
          <draggable-point :c.sync="c" :dim="dim" />
        </g>
      </svg>
    </svg-container>
    <div slot="footer">
      <p>Inside axis-aligned bounding box: {{inAABB}}</p>
      <p>Inside convex hull: {{inHull}}</p>
    </div>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Point as DraggablePoint} from '../draggables'
import {Line, Point} from '../shapes'
import {aabb} from '../bound'
import {objectVector} from '../geoUtils'
let {pointInsideHull, pointInsideAABB} = objectVector

export default {
  data () {
    return {
      dim: {width: 1, height: 1},
      points: [
        {x: -40, y: -10},
        {x: 20, y: 10},
        {x: -20, y: 30},
        {x: 40, y: 40}
      ],
      c: {x: -10, y: 10}
    }
  },
  computed: {
    inside () {
      return pointInsideHull(this.c, this.points)
    },
    lines () {
      let lines = []
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          lines.push({
            p: this.points[i],
            q: this.points[j]
          })
        }
      }
      return lines
    },
    aabb () {
      return aabb(this.points)
    },
    inAABB () {
      return pointInsideAABB(this.c, this.points)
    },
    inHull() {
      return pointInsideHull(this.c, this.points)
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggablePoint,
    Line,
    Point
  }
}
</script>

<style>
.light-line {
  stroke: grey;
  stroke-width: 3px;
}
.in-aabb {
  fill: orange;
}
.in-hull {
  fill: yellow;
}
</style>
