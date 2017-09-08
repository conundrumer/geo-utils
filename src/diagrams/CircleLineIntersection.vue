<template>
  <diagram-container>
    <h1 slot="header">Circle - Ray Segment Intersection</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <draggable-circle :c.sync="circle.c" :r.sync="circle.r" :dim="dim" />
          <draggable-ray :p.sync="line.p" :q.sync="line.q" :dim="dim" />
          <point v-if="intersection" :c="intersection" classes="intersection" :r="4" />
        </g>
      </svg>
    </svg-container>
    <p slot="footer"> Side: {{null}} </p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Ray as DraggableRay, Circle as DraggableCircle} from '../draggables'
import {Point} from '../shapes'
import {objectVector} from '../geoUtils'
let {circleLineIntersection} = objectVector

export default {
  data () {
    return {
      dim: {width: 1, height: 1},
      line: {
        p: {x: -10, y: -10},
        q: {x: 10, y: 10}
      },
      circle: {
        c: {x: -10, y: 10},
        r: {x: 20, y: 20}
      }
    }
  },
  computed: {
    radius () {
      let {c, r} = this.circle
      let x = r.x - c.x
      let y = r.y - c.y
      return Math.sqrt(x * x + y * y)
    },
    intersection () {
      let circle = {
        x: this.circle.c.x,
        y: this.circle.c.y,
        r: this.radius
      }
      let t = circleLineIntersection(circle, this.line)
      if (t !== null) {
        return {
          x: (1 - t) * this.line.p.x + t * this.line.q.x,
          y: (1 - t) * this.line.p.y + t * this.line.q.y
        }
      }
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggableRay,
    DraggableCircle,
    Point
  }
}
</script>
