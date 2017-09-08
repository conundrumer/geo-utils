<template>
  <diagram-container>
    <h1 slot="header">Line Segment - Line Segment Intersection</h1>
    <svg-container slot="content" :dim.sync="dim">
      <svg>
        <g :transform="[dim.width/2, dim.height/2] | fn 'translate'">
          <draggable-line :p.sync="line1.p" :q.sync="line1.q" :dim="dim" />
          <box :p.sync="line2.p" :q.sync="line2.q" :dim="dim" />
          <point v-if="intersection" :c="intersection" classes="intersection" :r="4" />
        </g>
      </svg>
    </svg-container>
    <p slot="footer">Inside: {{(inside)}}</p>
  </diagram-container>
</template>

<script>
import {DiagramContainer, SvgContainer} from '../containers'
import {Point} from '../shapes'
import {Line as DraggableLine, Box} from '../draggables'
import {objectVector} from '../geoUtils'
let {lineInBox} = objectVector

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
    box () {
      let {p: {x: x1, y: y1}, q: {x: x2, y: y2}} = this.line2
      if (x1 > x2) {
        [x1, x2] = [x2, x1]
      }
      if (y1 > y2) {
        [y1, y2] = [y2, y1]
      }
      return [x1, y1, x2, y2]
    },
    inside () {
      let inside = lineInBox(this.line1.p, this.line1.q, ...this.box)
      return inside
    }
  },
  components: {
    DiagramContainer,
    SvgContainer,
    DraggableLine,
    Point,
    Box
  }
}
</script>
