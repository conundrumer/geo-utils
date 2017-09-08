<template>
  <diagram-container>
    <h1 slot="header">Line Segment - Line Segment Intersection</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <draggable-line :p.sync="line1.p" :q.sync="line1.q" :dim="dim" />
          <draggable-line :p.sync="line2.p" :q.sync="line2.q" :dim="dim" />
          <point v-if="intersection" :c="intersection" classes="intersection" :r="4" />
        </g>
      </svg>
    </svg-container>
    <p slot="footer">Intersection: {{intersection !== undefined}}</p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Point} from '../shapes'
import {Line as DraggableLine} from '../draggables'
import {objectVector} from '../geoUtils'
let {lineLineIntersection} = objectVector

export default {
  data () {
    return {
      dim: {width: 1, height: 1},
      line1: {
        p: {x: -10, y: -10},
        q: {x: 10, y: 10}
      },
      line2: {
        p: {x: -10, y: 10},
        q: {x: 10, y: -10}
      }
    }
  },
  computed: {
    intersection () {
      let t = lineLineIntersection(this.line1, this.line2)
      if (t !== null) {
        return {
          x: (1 - t) * this.line1.p.x + t * this.line1.q.x,
          y: (1 - t) * this.line1.p.y + t * this.line1.q.y
        }
      }
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggableLine,
    Point
  }
}
</script>

<style>
.intersection {
  fill: yellow;
}
</style>
